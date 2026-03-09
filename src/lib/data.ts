import type { Part, FilterState } from "./types";
import partsData from "../../data/parts.json";

const parts: Part[] = partsData as Part[];

export function getAllParts(): Part[] {
  return parts;
}

export function getPartById(id: string): Part | undefined {
  return parts.find((p) => p.id === id);
}

export function getAllMakes(): string[] {
  const makes = new Set<string>();
  for (const part of parts) {
    for (const f of part.fitment) {
      makes.add(f.make);
    }
  }
  return Array.from(makes).sort();
}

export function getModelsForMake(make: string): string[] {
  const models = new Set<string>();
  for (const part of parts) {
    for (const f of part.fitment) {
      if (f.make === make) models.add(f.model);
    }
  }
  return Array.from(models).sort();
}

export function getYearsForMakeModel(make: string, model: string): number[] {
  const years = new Set<number>();
  for (const part of parts) {
    for (const f of part.fitment) {
      if (f.make === make && f.model === model) {
        for (let y = f.yearFrom; y <= f.yearTo; y++) {
          years.add(y);
        }
      }
    }
  }
  return Array.from(years).sort((a, b) => b - a); // newest first
}

export function getAllCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const part of parts) {
    counts.set(part.category, (counts.get(part.category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function filterParts(filters: Partial<FilterState>): Part[] {
  const { make, model, year, search, category } = filters;
  const yearNum = year ? parseInt(year, 10) : null;

  return parts.filter((part) => {
    // Vehicle fitment filter
    if (make) {
      const fits = part.fitment.some(
        (f) =>
          f.make === make &&
          (!model || f.model === model) &&
          (!yearNum || (yearNum >= f.yearFrom && yearNum <= f.yearTo))
      );
      if (!fits) return false;
    }

    // Category filter
    if (category && part.category !== category) return false;

    // Search filter (part name or part number)
    if (search) {
      const q = search.toLowerCase();
      if (
        !part.name.toLowerCase().includes(q) &&
        !part.partNumber.toLowerCase().includes(q) &&
        !(part.brand?.toLowerCase().includes(q))
      ) {
        return false;
      }
    }

    return true;
  });
}
