import type { Metadata } from "next"

// Generate metadata dynamically per brand
export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>
}): Promise<Metadata> {
  const { brand } = await params
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1).replace(/-/g, " ")

  return {
    title: `Used ${brandName} Parts | Engines, Transmissions & More`,
    description: `Find quality used ${brandName} parts from 2,000+ verified salvage yards. Engines, transmissions, body parts & more. Free shipping, 6-month warranty, 24-hour response. AUAPW.ORG — Your Trusted Partner.`,
  }
}

// This page will be replaced with full brand-specific content
// when you create the 48 individual brand pages
export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>
}) {
  const { brand } = await params
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1).replace(/-/g, " ")

  return (
    <div style={{ background: "#07090f", minHeight: "100vh", color: "#f5f5f5", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* This is a placeholder — replace with your brand-specific component */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, fontFamily: "'Syne', Georgia, sans-serif", marginBottom: 16 }}>
          Used {brandName} Parts
        </h1>
        <p style={{ fontSize: 16, color: "#9ca3af", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 32px" }}>
          Quality used OEM {brandName} parts from 2,000+ verified salvage yards nationwide.
          Free shipping, 6-month warranty, 24-hour response guaranteed.
        </p>
        <p style={{ fontSize: 13, color: "#6b7280" }}>
          AUAPW.ORG — All Used Auto Parts Warehouse — Your Trusted Partner for Automotive Services & Solutions
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }}>
          <a href="/" style={{ padding: "12px 24px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, color: "#f5f5f5", textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
            ← Back to AUAPW.ORG
          </a>
          <a href="tel:8888185001" style={{ padding: "12px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, color: "#9ca3af", textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
            📞 (888) 818-5001
          </a>
        </div>
      </div>
    </div>
  )
}
