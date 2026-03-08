import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "AUAPW.ORG — All Used Auto Parts Warehouse | Used Engines, Transmissions & More",
    template: "%s | AUAPW.ORG — All Used Auto Parts Warehouse",
  },
  description:
    "AUAPW.ORG — All Used Auto Parts Warehouse. Your Trusted Partner for Automotive Services & Solutions. Search 2,000+ verified salvage yards nationwide for used engines, transmissions, body parts & more. Free shipping, 6-month warranty, 24-hour response guaranteed.",
  keywords: [
    "used auto parts", "used engines", "used transmissions", "salvage yard parts",
    "AUAPW", "All Used Auto Parts Warehouse", "used car parts online",
    "OEM auto parts", "recycled auto parts", "auto parts warehouse",
    "used engine for sale", "used transmission for sale", "cheap auto parts",
    "auto parts near me", "nationwide auto parts", "auto parts with warranty",
  ],
  authors: [{ name: "AUAPW.ORG — All Used Auto Parts Warehouse" }],
  creator: "AUAPW.ORG",
  publisher: "All Used Auto Parts Warehouse",
  metadataBase: new URL("https://auapw.org"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://auapw.org",
    siteName: "AUAPW.ORG — All Used Auto Parts Warehouse",
    title: "AUAPW.ORG — All Used Auto Parts Warehouse | Premium Used Auto Parts Nationwide",
    description:
      "Search 2,000+ verified salvage yards. Used engines, transmissions, body parts & more. Free shipping, 6-month warranty, 24-hour response. Your Trusted Partner for Automotive Services & Solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AUAPW.ORG — All Used Auto Parts Warehouse",
    description:
      "Premium used auto parts from 2,000+ verified yards. Free shipping, 6-month warranty, 24-hour response.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data — LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoPartsStore",
              name: "AUAPW.ORG — All Used Auto Parts Warehouse",
              alternateName: "AUAPW",
              url: "https://auapw.org",
              telephone: "+1-888-818-5001",
              email: "info@auapw.org",
              address: {
                "@type": "PostalAddress",
                streetAddress: "107 Myrtle Ave",
                addressLocality: "Woodbine",
                addressRegion: "NJ",
                postalCode: "08270",
                addressCountry: "US",
              },
              description:
                "All Used Auto Parts Warehouse — Your Trusted Partner for Automotive Services & Solutions. 2,000+ verified salvage yards nationwide.",
              priceRange: "$$",
              openingHours: "Mo-Sa 08:00-18:00",
              areaServed: { "@type": "Country", name: "United States" },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Used Auto Parts",
                itemListElement: [
                  { "@type": "OfferCatalog", name: "Used Engines" },
                  { "@type": "OfferCatalog", name: "Used Transmissions" },
                  { "@type": "OfferCatalog", name: "Drivetrain Parts" },
                  { "@type": "OfferCatalog", name: "Electrical Parts" },
                  { "@type": "OfferCatalog", name: "Body Parts" },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
