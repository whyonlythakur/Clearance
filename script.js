// ---------------------------------------------------------------
// Clearance — Password Strength & Breach Checker
// 100% client-side. Passwords never leave the browser in plaintext.
// Breach check uses the HaveIBeenPwned Pwned Passwords k-anonymity
// API: only the first 5 chars of a SHA-1 hash are ever transmitted.
// ---------------------------------------------------------------

const pwInput = document.getElementById('pw-input');
const toggleBtn = document.getElementById('toggle-visibility');
const meterFill = document.getElementById('meter-fill');
const meterLabel = document.getElementById('meter-label');

const outEntropy = document.getElementById('out-entropy');
const outPool = document.getElementById('out-pool');
const outLength = document.getElementById('out-length');
const outOnline = document.getElementById('out-online');
const outOfflineSlow = document.getElementById('out-offline-slow');
const outOfflineFast = document.getElementById('out-offline-fast');
const breachResult = document.getElementById('breach-result');

toggleBtn.addEventListener('click', () => {
  pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
});

// --- Entropy & strength -------------------------------------------------

function characterPoolSize(pw) {
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32; // approx printable symbols
  return pool || 1;
}

function calcEntropyBits(pw) {
  if (!pw) return 0;
  const pool = characterPoolSize(pw);
  return pw.length * Math.log2(pool);
}

function formatDuration(seconds) {
  if (!isFinite(seconds) || seconds < 0) return '—';
  const units = [
    ['century', 60 * 60 * 24 * 365 * 100],
    ['year', 60 * 60 * 24 * 365],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1],
  ];
  if (seconds < 1) return 'instantly';
  for (const [label, unitSeconds] of units) {
    if (seconds >= unitSeconds) {
      const value = seconds / unitSeconds;
      if (value > 1e6) return `${value.toExponential(1)} ${label}s`;
      return `${Math.round(value).toLocaleString()} ${label}${value >= 2 ? 's' : ''}`;
    }
  }
  return 'instantly';
}

function crackTimeSeconds(entropyBits, guessesPerSecond) {
  const totalGuesses = Math.pow(2, entropyBits);
  // Average case: attacker finds it halfway through the keyspace
  return (totalGuesses / 2) / guessesPerSecond;
}

function strengthFromEntropy(bits) {
  if (bits === 0) return { label: '—', pct: 0, color: 'var(--red)' };
  if (bits < 28) return { label: 'Very Weak', pct: 15, color: 'var(--red)' };
  if (bits < 36) return { label: 'Weak', pct: 35, color: '#c78a4f' };
  if (bits < 50) return { label: 'Fair', pct: 55, color: 'var(--amber)' };
  if (bits < 65) return { label: 'Strong', pct: 80, color: '#8fbf6b' };
  return { label: 'Very Strong', pct: 100, color: 'var(--green)' };
}

// --- SHA-1 via Web Crypto (for k-anonymity HIBP lookup) -----------------

async function sha1Hex(text) {
  const enc = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-1', enc);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

async function checkBreach(pw) {
  const hash = await sha1Hex(pw);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
    headers: { 'Add-Padding': 'true' },
  });
  if (!res.ok) throw new Error('Lookup failed');
  const text = await res.text();

  const lines = text.split('\n');
  for (const line of lines) {
    const [suf, count] = line.trim().split(':');
    if (suf === suffix) {
      return parseInt(count, 10);
    }
  }
  return 0;
}

// --- Wire it up together --------------------------------------------------

let debounceTimer = null;

function updateStaticAnalysis(pw) {
  const bits = calcEntropyBits(pw);
  const pool = characterPoolSize(pw);
  const strength = strengthFromEntropy(bits);

  meterFill.style.width = strength.pct + '%';
  meterFill.style.background = strength.color;
  meterLabel.textContent = pw ? strength.label : '—';

  outEntropy.textContent = pw ? `${bits.toFixed(1)} bits` : '—';
  outPool.textContent = pw ? `${pool} chars` : '—';
  outLength.textContent = pw ? `${pw.length}` : '—';

  outOnline.textContent = pw ? formatDuration(crackTimeSeconds(bits, 100 / 3600)) : '—';        // ~100 guesses/hour, throttled
  outOfflineSlow.textContent = pw ? formatDuration(crackTimeSeconds(bits, 10000)) : '—';          // 10k/s, bcrypt-ish
  outOfflineFast.textContent = pw ? formatDuration(crackTimeSeconds(bits, 10_000_000_000)) : '—'; // 10B/s, GPU farm on fast hash
}

async function updateBreachCheck(pw) {
  if (!pw) {
    breachResult.textContent = 'Start typing to run a check — nothing is sent until 500ms after you stop.';
    breachResult.className = 'breach-idle';
    return;
  }
  breachResult.textContent = 'Hashing locally, querying breach database…';
  breachResult.className = 'breach-checking';

  try {
    const count = await checkBreach(pw);
    if (count > 0) {
      breachResult.innerHTML = `⚠ Found in <b>${count.toLocaleString()}</b> known breaches. Do not use this password.`;
      breachResult.className = 'breach-hit';
    } else {
      breachResult.textContent = '✓ Not found in any known breach dataset.';
      breachResult.className = 'breach-safe';
    }
  } catch (e) {
    breachResult.textContent = 'Breach lookup unavailable right now — try again shortly.';
    breachResult.className = 'breach-idle';
  }
}

pwInput.addEventListener('input', (e) => {
  const pw = e.target.value;
  updateStaticAnalysis(pw);

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => updateBreachCheck(pw), 500);
});
