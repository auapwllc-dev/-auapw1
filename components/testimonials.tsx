'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'John Smith',
    role: 'Auto Repair Shop Owner',
    text: 'AUAPW has been our go-to supplier for used parts. Fast shipping and great quality!'
  },
  {
    name: 'Sarah Johnson',
    role: 'Fleet Manager',
    text: 'Excellent service and competitive pricing. They handle large orders seamlessly.'
  },
  {
    name: 'Mike Chen',
    role: 'Independent Mechanic',
    text: 'Best prices I\'ve found for quality used parts. Highly recommended!'
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">What Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg">
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={16} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
                ))}
              </div>
              <p className="text-[var(--color-fg-secondary)] mb-4 italic">"{t.text}"</p>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-[var(--color-fg-secondary)]">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
