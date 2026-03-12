'use client'

const brands = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz',
  'Nissan', 'Volkswagen', 'Mazda', 'Audi', 'Jeep', 'Ram'
]

export default function Brands() {
  return (
    <section id="brands" className="py-24 px-6 bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">Shop by Brand</h2>
        <div className="grid md:grid-cols-6 gap-4">
          {brands.map((brand, idx) => (
            <div 
              key={idx}
              className="p-8 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-center hover:border-[var(--color-accent)] cursor-pointer transition"
            >
              <p className="font-semibold">{brand}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
