'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-border-light)] backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-widest">AUAPW.ORG</h1>
          <p className="text-xs text-[var(--color-fg-secondary)] tracking-widest">ALL USED AUTO PARTS WORLD</p>
        </div>
        
        <div className="hidden md:flex gap-8 items-center">
          <Link href="#services" className="text-sm hover:text-[var(--color-accent)] transition">Parts</Link>
          <Link href="#categories" className="text-sm hover:text-[var(--color-accent)] transition">Categories</Link>
          <Link href="#brands" className="text-sm hover:text-[var(--color-accent)] transition">Brands</Link>
          <Link href="#contact" className="text-sm hover:text-[var(--color-accent)] transition">Contact</Link>
          <button className="px-4 py-2 bg-[var(--color-accent)] text-white rounded text-sm font-medium hover:bg-[var(--color-accent-dark)] transition">
            Get Quote
          </button>
        </div>

        <button 
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border-light)] px-6 py-4 space-y-4">
          <Link href="#services" className="block text-sm hover:text-[var(--color-accent)] transition">Parts</Link>
          <Link href="#categories" className="block text-sm hover:text-[var(--color-accent)] transition">Categories</Link>
          <Link href="#brands" className="block text-sm hover:text-[var(--color-accent)] transition">Brands</Link>
          <Link href="#contact" className="block text-sm hover:text-[var(--color-accent)] transition">Contact</Link>
          <button className="w-full px-4 py-2 bg-[var(--color-accent)] text-white rounded text-sm font-medium">
            Get Quote
          </button>
        </div>
      )}
    </header>
  )
}
