"use client";

import { useState, useMemo } from "react";
import type { FilterState, Part } from "@/lib/types";

interface UseFilterOptions {
  parts: Part[];
  makes: string[];
  categories: { name: string; count: number }[];
}

export function useFilter({ parts, makes, categories }: UseFilterOptions) {
  const [filters, setFilters] = useState<FilterState>({
    make: "",
    model: "",
    year: "",
    search: "",
    category: "",
  });

  // Derive available models from selected make
  const availableModels = useMemo(() => {
    if (!filters.make) return [];
    const models = new Set<string>();
    for (const part of parts) {
      for (const f of part.fitment) {
        if (f.make === filters.make) models.add(f.model);
      }
    }
    return Array.from(models).sort();
  }, [parts, filters.make]);

  // Derive available years from selected make + model
  const availableYears = useMemo(() => {
    if (!filters.make || !filters.model) return [];
    const years = new Set<number>();
    for (const part of parts) {
      for (const f of part.fitment) {
        if (f.make === filters.make && f.model === filters.model) {
          for (let y = f.yearFrom; y <= f.yearTo; y++) years.add(y);
        }
      }
    }
    return Array.from(years).sort((a, b) => b - a);
  }, [parts, filters.make, filters.model]);

  // Filtered parts
  const filteredParts = useMemo(() => {
    const yearNum = filters.year ? parseInt(filters.year, 10) : null;
    return parts.filter((part) => {
      if (filters.make) {
        const fits = part.fitment.some(
          (f) =>
            f.make === filters.make &&
            (!filters.model || f.model === filters.model) &&
            (!yearNum || (yearNum >= f.yearFrom && yearNum <= f.yearTo))
        );
        if (!fits) return false;
      }
      if (filters.category && part.category !== filters.category) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !part.name.toLowerCase().includes(q) &&
          !part.partNumber.toLowerCase().includes(q) &&
          !(part.brand?.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });
  }, [parts, filters]);

  function setMake(make: string) {
    setFilters({ make, model: "", year: "", search: filters.search, category: filters.category });
  }

  function setModel(model: string) {
    setFilters({ ...filters, model, year: "" });
  }

  function setYear(year: string) {
    setFilters({ ...filters, year });
  }

  function setSearch(search: string) {
    setFilters({ ...filters, search });
  }

  function setCategory(category: string) {
    setFilters({ ...filters, category });
  }

  function clearFilters() {
    setFilters({ make: "", model: "", year: "", search: "", category: "" });
  }

  const hasActiveFilters =
    !!filters.make || !!filters.category || !!filters.search;

  return {
    filters,
    filteredParts,
    availableModels,
    availableYears,
    makes,
    categories,
    setMake,
    setModel,
    setYear,
    setSearch,
    setCategory,
    clearFilters,
    hasActiveFilters,
  };
}
