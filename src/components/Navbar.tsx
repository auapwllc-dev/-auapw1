import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-red-500 font-black text-2xl tracking-tight">
              AUTO
            </span>
            <span className="font-black text-2xl tracking-tight">PARTS</span>
          </Link>

          <div className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/catalog"
              className="hover:text-red-400 transition-colors"
            >
              Catalog
            </Link>
            <a
              href="mailto:info@autoparts.com"
              className="bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-md"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
