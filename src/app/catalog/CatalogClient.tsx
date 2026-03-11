"use client";

import { useFilter } from "@/hooks/useFilter";
import type { Part } from "@/lib/types";
import VehicleFilter from "@/components/VehicleFilter";
import SearchBar from "@/components/SearchBar";
import CategorySidebar from "@/components/CategorySidebar";
import PartsGrid from "@/components/PartsGrid";

interface CatalogClientProps {
  parts: Part[];
  makes: string[];
  categories: { name: string; count: number }[];
}

export default function CatalogClient({
  parts,
  makes,
  categories,
}: CatalogClientProps) {
  const {
    filters,
    filteredParts,
    availableModels,
    availableYears,
    setMake,
    setModel,
    setYear,
    setSearch,
    setCategory,
    clearFilters,
    hasActiveFilters,
  } = useFilter({ parts, makes, categories });

  return (
    <>
      <VehicleFilter
        makes={makes}
        models={availableModels}
        years={availableYears}
        selectedMake={filters.make}
        selectedModel={filters.model}
        selectedYear={filters.year}
        onMakeChange={setMake}
        onModelChange={setModel}
        onYearChange={setYear}
        onClear={() => {
          setMake("");
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active filter badge */}
        {filters.make && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-slate-600">Showing parts for:</span>
            <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              {[filters.year, filters.make, filters.model]
                .filter(Boolean)
                .join(" ")}
              <button
                onClick={() => setMake("")}
                className="ml-1 hover:text-red-600"
              >
                ✕
              </button>
            </span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-52 shrink-0">
            <div className="mb-6">
              <SearchBar value={filters.search} onChange={setSearch} />
            </div>
            <CategorySidebar
              categories={categories}
              selected={filters.category}
              onSelect={setCategory}
            />
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-6 w-full text-sm text-slate-500 hover:text-red-600 border border-slate-200 rounded-md py-2 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Main grid */}
          <div className="flex-1 min-w-0">
            <PartsGrid parts={filteredParts} totalCount={parts.length} />
          </div>
        </div>
      </div>
    </>
  );
}
