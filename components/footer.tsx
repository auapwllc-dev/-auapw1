'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg)] border-t border-[var(--color-border-light)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-bold mb-4">AUAPW</h3>
            <p className="text-sm text-[var(--color-fg-secondary)]">Your trusted source for quality used auto parts.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#services" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-accent)] transition">Services</Link></li>
              <li><Link href="#categories" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-accent)] transition">Categories</Link></li>
              <li><Link href="#brands" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-accent)] transition">Brands</Link></li>
              <li><Link href="#contact" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-accent)] transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-accent)] transition">FAQ</Link></li>
              <li><Link href="#" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-accent)] transition">Shipping Info</Link></li>
              <li><Link href="#" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-accent)] transition">Returns</Link></li>
              <li><Link href="#" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-accent)] transition">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Phone size={16} className="text-[var(--color-accent)] flex-shrink-0" />
                <span>(888) 818-5001</span>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="text-[var(--color-accent)] flex-shrink-0" />
                <span>info@auapw.org</span>
              </li>
              <li className="flex gap-2">
                <MapPin size={16} className="text-[var(--color-accent)] flex-shrink-0" />
                <span>107 Myrtle Ave, Woodbine, NJ 08270</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-border-light)] pt-8 text-center text-sm text-[var(--color-fg-secondary)]">
          <p>&copy; 2024 AUAPW. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
