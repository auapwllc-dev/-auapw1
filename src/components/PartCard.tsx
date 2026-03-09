import Link from "next/link";
import type { Part } from "@/lib/types";

interface PartCardProps {
  part: Part;
}

export default function PartCard({ part }: PartCardProps) {
  return (
    <Link href={`/catalog/${part.id}`} className="group block">
      <div className="border border-slate-200 rounded-lg overflow-hidden hover:border-red-400 hover:shadow-md transition-all bg-white h-full flex flex-col">
        {/* Image placeholder */}
        <div className="bg-slate-100 h-40 flex items-center justify-center text-slate-300">
          {part.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={part.imageUrl}
              alt={part.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <svg
              className="h-16 w-16"
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

        <div className="p-4 flex flex-col flex-1">
          <span className="text-xs text-slate-400 font-mono mb-1">
            {part.partNumber}
          </span>
          <h3 className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors leading-snug mb-1">
            {part.name}
          </h3>
          {part.brand && (
            <p className="text-xs text-slate-500 mb-2">{part.brand}</p>
          )}
          <span className="inline-block text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full mb-3">
            {part.category}
          </span>

          <div className="mt-auto flex items-center justify-between">
            {part.price != null ? (
              <span className="text-lg font-bold text-slate-900">
                ${part.price.toFixed(2)}
              </span>
            ) : (
              <span className="text-sm text-slate-400">Call for price</span>
            )}
            <span className="text-xs text-red-600 font-medium group-hover:underline">
              View details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
