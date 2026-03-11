"use client";

interface Category {
  name: string;
  count: number;
}

interface CategorySidebarProps {
  categories: Category[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategorySidebar({
  categories,
  selected,
  onSelect,
}: CategorySidebarProps) {
  return (
    <aside className="w-full">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
        Categories
      </h3>
      <ul className="space-y-1">
        <li>
          <button
            onClick={() => onSelect("")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
              selected === ""
                ? "bg-red-600 text-white font-semibold"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>All Categories</span>
            <span
              className={`text-xs ${
                selected === "" ? "text-red-200" : "text-slate-400"
              }`}
            >
              {categories.reduce((s, c) => s + c.count, 0)}
            </span>
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.name}>
            <button
              onClick={() => onSelect(cat.name)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                selected === cat.name
                  ? "bg-red-600 text-white font-semibold"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-xs ${
                  selected === cat.name ? "text-red-200" : "text-slate-400"
                }`}
              >
                {cat.count}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
