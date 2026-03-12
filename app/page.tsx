'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Services from '@/components/services'
import Categories from '@/components/categories'
import Brands from '@/components/brands'
import Testimonials from '@/components/testimonials'
import FAQ from '@/components/faq'
import QuoteForm from '@/components/quote-form'
import Newsletter from '@/components/newsletter'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Categories />
      <Brands />
      <Testimonials />
      <FAQ />
      <QuoteForm />
      <Newsletter />
      <Footer />
    </main>
  )
}
