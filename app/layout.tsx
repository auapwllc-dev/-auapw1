import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "AUAPW.ORG — All Used Auto Parts Warehouse",
  description:
    "Search 2,000+ verified salvage yards for quality used OEM auto parts. Engines, transmissions, body parts & more. Free shipping, 6-month warranty, 24-hour response.",
  keywords:
    "used auto parts, used engines, used transmissions, salvage yard parts, OEM parts, auto parts warehouse, AUAPW",
  openGraph: {
    title: "AUAPW.ORG — All Used Auto Parts Warehouse",
    description:
      "Premium quality used auto parts from 2,000+ verified yards. Free shipping & 6-month warranty.",
    siteName: "AUAPW.ORG",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#07090f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
