'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    q: 'How long does shipping take?',
    a: 'We typically ship within 1-2 business days. Delivery times vary by location, usually 3-7 business days.'
  },
  {
    q: 'Are your parts guaranteed?',
    a: 'Yes, all parts are tested and come with our quality guarantee. Returns accepted within 30 days.'
  },
  {
    q: 'Do you offer wholesale pricing?',
    a: 'Yes! Contact our sales team for bulk order discounts.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, bank transfers, and PayPal.'
  }
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 bg-[var(--color-bg-secondary)]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <button
              key={idx}
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full p-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-left hover:border-[var(--color-accent)] transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{faq.q}</h3>
                <ChevronDown 
                  size={20} 
                  className={`transition ${open === idx ? 'rotate-180' : ''}`}
                />
              </div>
              {open === idx && (
                <p className="text-[var(--color-fg-secondary)] mt-4 text-sm">{faq.a}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
