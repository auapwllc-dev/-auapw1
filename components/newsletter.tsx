'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section className="py-16 px-6 bg-[var(--color-bg-secondary)]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-[var(--color-fg-secondary)] mb-8">Subscribe to our newsletter for the latest deals and inventory updates.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            required
            className="flex-1 px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-white placeholder-[var(--color-fg-secondary)] focus:border-[var(--color-accent)] outline-none transition"
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-[var(--color-accent)] text-white rounded font-medium hover:bg-[var(--color-accent-dark)] transition whitespace-nowrap"
          >
            {subscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  )
}
