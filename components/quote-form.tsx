'use client'

import { useState } from 'react'

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Get a Quote</h2>
        <p className="text-[var(--color-fg-secondary)] mb-12">Fill out the form below and we'll get back to you with pricing information.</p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[var(--color-bg-secondary)] p-8 rounded-lg border border-[var(--color-border)]">
          <div className="grid md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="Full Name" 
              required
              className="px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-white placeholder-[var(--color-fg-secondary)] focus:border-[var(--color-accent)] outline-none transition"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              className="px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-white placeholder-[var(--color-fg-secondary)] focus:border-[var(--color-accent)] outline-none transition"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <input 
              type="text" 
              placeholder="Vehicle Year" 
              className="px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-white placeholder-[var(--color-fg-secondary)] focus:border-[var(--color-accent)] outline-none transition"
            />
            <input 
              type="text" 
              placeholder="Make" 
              className="px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-white placeholder-[var(--color-fg-secondary)] focus:border-[var(--color-accent)] outline-none transition"
            />
            <input 
              type="text" 
              placeholder="Model" 
              className="px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-white placeholder-[var(--color-fg-secondary)] focus:border-[var(--color-accent)] outline-none transition"
            />
          </div>

          <input 
            type="text" 
            placeholder="Part Needed" 
            required
            className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-white placeholder-[var(--color-fg-secondary)] focus:border-[var(--color-accent)] outline-none transition"
          />

          <textarea 
            placeholder="Additional Notes" 
            rows={4}
            className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-white placeholder-[var(--color-fg-secondary)] focus:border-[var(--color-accent)] outline-none transition resize-none"
          />

          <button 
            type="submit"
            className="w-full px-6 py-3 bg-[var(--color-accent)] text-white rounded font-medium hover:bg-[var(--color-accent-dark)] transition"
          >
            {submitted ? 'Quote Sent!' : 'Request Quote'}
          </button>
        </form>
      </div>
    </section>
  )
}
