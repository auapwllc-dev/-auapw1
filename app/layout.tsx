import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'AUAPW – All Used Auto Parts World',
  description: 'Find quality used auto parts at the best prices. Engines, transmissions, body parts and more for all makes and models.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://auapw.org',
    siteName: 'AUAPW',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#0a0c14',
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-[var(--color-bg)] text-[var(--color-fg)]">
        {children}
      </body>
    </html>
  )
}
