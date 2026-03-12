'use client'

import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6 min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Quality Used Auto Parts
          </h1>
          <p className="text-lg text-[var(--color-fg-secondary)] mb-8 max-w-xl leading-relaxed">
            Find the parts you need at the best prices. Complete inventory of engines, transmissions, body parts, and more for all makes and models.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-[var(--color-accent)] text-white rounded font-medium hover:bg-[var(--color-accent-dark)] transition flex items-center gap-2 justify-center">
              Find Parts <ArrowRight size={20} />
            </button>
            <button className="px-8 py-3 border border-[var(--color-border)] text-white rounded font-medium hover:bg-[var(--color-bg-secondary)] transition">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
