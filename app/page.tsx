"use client"

import { Linkedin, Mail, Instagram, Twitter, Zap } from 'lucide-react'
import { useState } from "react"

export default function ArpitCard() {
  const [quoteExpanded, setQuoteExpanded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState("")

  const handleShare = async () => {
    const cardUrl = window.location.href
    const cardTitle = "Check out Arpit Singh's Digital Card"
    const cardDescription = "Founder of Snap-Z • Talent Management & Influencer Marketing Specialist"

    if (navigator.share) {
      try {
        await navigator.share({
          title: cardTitle,
          text: cardDescription,
          url: cardUrl,
        })
      } catch (error) {
        console.log("[v0] Share cancelled or failed")
      }
    } else {
      // Fallback for devices without native share
      setCopyFeedback("Share not available on this device")
      setTimeout(() => setCopyFeedback(""), 2000)
    }
  }

  const handleCopyLink = async () => {
    const cardUrl = window.location.href
    try {
      await navigator.clipboard.writeText(cardUrl)
      setCopyFeedback("✓ Link copied to clipboard!")
      setTimeout(() => setCopyFeedback(""), 2000)
    } catch (error) {
      setCopyFeedback("Failed to copy link")
      setTimeout(() => setCopyFeedback(""), 2000)
    }
  }

  const handleDownloadImage = async () => {
    try {
      const imageUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/card-image-50HsYJO8Cg6oeSwGrb1U93oHJmswG6.jpeg" // Updated to use the custom card image provided by user
      const link = document.createElement("a")
      link.href = imageUrl
      link.download = "arpit-singh-card.jpeg"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setCopyFeedback("✓ Card image downloaded!")
      setTimeout(() => setCopyFeedback(""), 2000)
    } catch (error) {
      setCopyFeedback("Failed to download image")
      setTimeout(() => setCopyFeedback(""), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-4 flex items-center justify-center">
      {/* Compact Visiting Card */}
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-primary/10">
          {/* Header Strip */}
          <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>

          {/* Card Content */}
          <div className="p-8">
            {/* Expandable Quote */}
            <div
              className="inline-flex items-center justify-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-3 py-1 mb-6 cursor-pointer transition-all duration-300 hover:bg-primary/10 w-full"
              onClick={() => setQuoteExpanded(!quoteExpanded)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className={`text-xs font-semibold text-primary ${isHovering ? 'typewriter-text active' : ''}`}>
                {isHovering ? "Jack of All, Master of None, but oftentimes better than Master of One" : "Jack of All"}
              </span>
            </div>

            {/* Name with Profile Picture */}
            <div className="flex items-center justify-between mb-2 -mt-3">
              <div>
                <h1 className="text-4xl font-bold text-foreground px-0 mx-0 my-0 py-0">Arpit Singh</h1>
                <h3 className="text-lg font-semibold text-primary">aka Thakur</h3>
              </div>
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-secondary p-1 flex-shrink-0 ml-4 shadow-lg">
                <img 
                  src="/images/design-mode/image-1.webp"
                  alt="Arpit Singh" 
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>
            </div>

            {/* Title */}
            <p className="text-lg font-semibold text-primary mt-0 mb-6">Founder of Snap-Z</p>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Digital marketing strategist specializing in <span className="font-semibold text-foreground">talent management</span> and <span className="font-semibold text-foreground">influencer marketing</span>.<br /> Building the future of creator economy through Snap-Z.
            </p>

            {/* Specialties */}
            <div className="space-y-3 mb-8 pb-8 border-b border-primary/10">
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">Talent Management</span>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">Influencer Marketing</span>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">Creator Strategy</span>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">Growth Hacking</span>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mb-8">
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Get In Touch</p>
              <a
                href="mailto:arpit@snap-z.com"
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors mb-2"
              >
                <Mail className="w-4 h-4" />
                whyonlythakur@snapzone.online
              </a>
              <a
                href="https://discord.gg/sdjVVdtkde"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515a.074.074 0 00-.079.037c-.211.375-.445.865-.607 1.25a18.27 18.27 0 00-5.487 0c-.163-.39-.395-.875-.608-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03a.078.078 0 00.084-.028a19.86 19.86 0 006-3.03a.077.077 0 00.032-.057c.5-4.566-.838-8.529-3.549-12.047a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156c0-1.193.96-2.157 2.157-2.157c1.202 0 2.169.964 2.157 2.157c0 1.19-.955 2.157-2.157 2.157zm7.975 0c-1.183 0-2.157-.965-2.157-2.156c0-1.193.96-2.157 2.157-2.157c1.202 0 2.169.964 2.157 2.157c0 1.19-.955 2.157-2.157 2.157z" />
                </svg>
                Join Discord Community
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-6 border-t border-primary/10">
              <a
                href="https://linkedin.com/in/whyonlythakur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 button-hover-lift"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/whyonlythakur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 button-hover-lift"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/whyonlythakur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 button-hover-lift"
                title="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://snapzone.online"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 button-hover-lift"
                title="Snap-Z"
              >
                <Zap className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-primary/5 px-8 py-4 text-center">
            <p className="text-xs text-muted-foreground">
              🚀 Building the future of creator economy <br />
              Because Every Creator Matters.• Available for collaborations
            </p>
          </div>
        </div>

        {/* Share Instructions - Now Interactive */}
        <div className="text-center mt-6 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <button
              onClick={handleShare}
              className="text-primary hover:text-secondary font-semibold hover:underline transition-colors cursor-pointer"
              title="Share this card via available options"
            >
              Share this card
            </button>
            <span className="text-muted-foreground">•</span>
            <button
              onClick={handleCopyLink}
              className="text-primary hover:text-secondary font-semibold hover:underline transition-colors cursor-pointer"
              title="Copy card link to clipboard"
            >
              Copy link
            </button>
            <span className="text-muted-foreground">•</span>
            <button
              onClick={handleDownloadImage}
              className="text-primary hover:text-secondary font-semibold hover:underline transition-colors cursor-pointer"
              title="Download card as image"
            >
              Download as image
            </button>
          </div>
          
          {copyFeedback && (
            <p className="text-xs text-primary font-semibold animate-pulse">
              {copyFeedback}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
