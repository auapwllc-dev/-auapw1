import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllParts, getPartById } from "@/lib/data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ partId: string }>;
}

export async function generateStaticParams() {
  const parts = getAllParts();
  return parts.map((p) => ({ partId: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { partId } = await params;
  const part = getPartById(partId);
  if (!part) return { title: "Part Not Found" };
  return { title: `${part.name} (${part.partNumber}) — AutoParts` };
}

export default async function PartDetailPage({ params }: Props) {
  const { partId } = await params;
  const part = getPartById(partId);

  if (!part) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/catalog" className="hover:text-red-600 transition-colors">
          Catalog
        </Link>
        <span>›</span>
        <span>{part.category}</span>
        <span>›</span>
        <span className="text-slate-800 font-medium">{part.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-slate-100 rounded-xl flex items-center justify-center h-72 md:h-96 text-slate-300">
          {part.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={part.imageUrl}
              alt={part.name}
              className="h-full w-full object-contain rounded-xl"
            />
          ) : (
            <svg
              className="h-24 w-24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>

        {/* Details */}
        <div>
          <span className="inline-block text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full mb-3">
            {part.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            {part.name}
          </h1>
          <p className="text-sm font-mono text-slate-500 mb-1">
            Part #: {part.partNumber}
          </p>
          {part.brand && (
            <p className="text-sm text-slate-500 mb-4">Brand: {part.brand}</p>
          )}
          {part.price != null ? (
            <p className="text-3xl font-bold text-slate-900 mb-6">
              ${part.price.toFixed(2)}
            </p>
          ) : (
            <p className="text-lg text-slate-400 mb-6">Call for price</p>
          )}
          {part.description && (
            <p className="text-slate-600 leading-relaxed mb-6">
              {part.description}
            </p>
          )}

          <Link
            href="/catalog"
            className="inline-flex items-center text-sm text-red-600 hover:underline"
          >
            ← Back to catalog
          </Link>
        </div>
      </div>

      {/* Fitment table */}
      {part.fitment.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Compatible Vehicles
          </h2>
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">
                    Make
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">
                    Model
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">
                    Year Range
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {part.fitment.map((f, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {f.make}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{f.model}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {f.yearFrom === f.yearTo
                        ? f.yearFrom
                        : `${f.yearFrom} – ${f.yearTo}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
