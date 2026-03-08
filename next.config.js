/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ── Brand subdomain rewrites ──
  // Maps ford.auapw.org → /brands/ford, toyota.auapw.org → /brands/toyota, etc.
  async rewrites() {
    return {
      beforeFiles: [
        // Subdomain routing for brand pages
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '(?<brand>[a-z0-9-]+)\\.auapw\\.org',
            },
          ],
          destination: '/brands/:brand/:path*',
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },

  // ── Custom headers for SEO + security ──
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ]
  },

  // ── Image optimization domains ──
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.auapw.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

module.exports = nextConfig
