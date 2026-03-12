'use client'

import { Truck, Shield, Clock, DollarSign } from 'lucide-react'

const services = [
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Quick and reliable delivery to your location'
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'All parts tested and verified for quality'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'We are always available to help you'
  },
  {
    icon: DollarSign,
    title: 'Best Prices',
    description: 'Competitive pricing on all auto parts'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Why Choose AUAPW</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <div key={idx} className="p-8 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)] transition">
                <Icon className="w-12 h-12 text-[var(--color-accent)] mb-4" />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-[var(--color-fg-secondary)] text-sm">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
