'use client'

const categories = [
  'Engines & Transmissions',
  'Body Parts',
  'Interior Parts',
  'Electrical Components',
  'Suspension & Steering',
  'Cooling Systems',
  'Exhaust Systems',
  'Glass & Trim'
]

export default function Categories() {
  return (
    <section id="categories" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">Parts Categories</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)] cursor-pointer transition group"
            >
              <h3 className="font-semibold group-hover:text-[var(--color-accent)] transition">{cat}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
