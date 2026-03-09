/**
 * CSV → parts.json converter
 *
 * Usage:
 *   1. Place your CSV file at: data/raw/parts.csv
 *   2. Edit the COLUMN_MAP below to match your CSV headers exactly
 *   3. Run: npm run convert
 *
 * The script writes the result to data/parts.json.
 */

import fs from "fs";
import path from "path";
import Papa from "papaparse";

// ─── CONFIGURE COLUMN MAPPING HERE ───────────────────────────────────────────
// Map from Part interface fields → your CSV column header names.
// Set a field to "" if your CSV doesn't have it.
const COLUMN_MAP = {
  partNumber: "Part Number",     // required
  name: "Part Name",             // required
  description: "Description",
  category: "Category",          // required
  brand: "Brand",
  price: "Price",                // numeric, e.g. "24.99" or "$24.99"
  imageUrl: "Image URL",

  // Fitment columns — choose ONE of the two formats below:
  //
  // FORMAT A: separate Make, Model, Year From, Year To columns
  //   (one fitment row per part, or multiple rows with the same part number)
  fitmentMake: "Make",
  fitmentModel: "Model",
  fitmentYearFrom: "Year From",
  fitmentYearTo: "Year To",

  // FORMAT B: a single "Fitment" column like: "Toyota Camry 2018-2024; Honda Accord 2017-2023"
  //   Leave fitmentMake/Model/YearFrom/YearTo blank and set this instead.
  fitmentCombined: "",           // e.g. "Fitment" — leave "" to use Format A
};
// ─────────────────────────────────────────────────────────────────────────────

interface RawRow {
  [key: string]: string;
}

interface Fitment {
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
}

interface Part {
  id: string;
  partNumber: string;
  name: string;
  description?: string;
  category: string;
  brand?: string;
  price?: number;
  imageUrl?: string;
  fitment: Fitment[];
}

function cleanPrice(raw: string): number | undefined {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? undefined : n;
}

function parseFitmentCombined(raw: string): Fitment[] {
  // Expected format: "Toyota Camry 2018-2024; Honda Accord 2015-2020"
  return raw
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .flatMap((entry) => {
      const match = entry.match(/^(.+?)\s+(\d{4})-(\d{4})$/);
      if (!match) return [];
      const parts = match[1].trim().split(/\s+/);
      const make = parts[0];
      const model = parts.slice(1).join(" ");
      return [
        {
          make,
          model,
          yearFrom: parseInt(match[2], 10),
          yearTo: parseInt(match[3], 10),
        },
      ];
    });
}

function col(row: RawRow, field: string): string {
  const header = COLUMN_MAP[field as keyof typeof COLUMN_MAP];
  if (!header) return "";
  return (row[header] ?? "").trim();
}

function main() {
  const csvPath = path.resolve(__dirname, "../data/raw/parts.csv");
  const outPath = path.resolve(__dirname, "../data/parts.json");

  if (!fs.existsSync(csvPath)) {
    console.error(`❌  CSV not found at: ${csvPath}`);
    console.error("    Place your CSV file there and re-run.");
    process.exit(1);
  }

  const csvText = fs.readFileSync(csvPath, "utf-8");
  const { data, errors } = Papa.parse<RawRow>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length) {
    console.warn("⚠️  Parse warnings:");
    errors.forEach((e) => console.warn("   ", e.message));
  }

  // Group rows by part number to merge multiple fitment rows into one Part
  const partsMap = new Map<string, Part>();

  for (const row of data) {
    const partNumber = col(row, "partNumber");
    if (!partNumber) continue;

    if (!partsMap.has(partNumber)) {
      const priceRaw = col(row, "price");
      partsMap.set(partNumber, {
        id: partNumber,
        partNumber,
        name: col(row, "name"),
        description: col(row, "description") || undefined,
        category: col(row, "category") || "General",
        brand: col(row, "brand") || undefined,
        price: priceRaw ? cleanPrice(priceRaw) : undefined,
        imageUrl: col(row, "imageUrl") || undefined,
        fitment: [],
      });
    }

    const part = partsMap.get(partNumber)!;

    if (COLUMN_MAP.fitmentCombined) {
      // Format B
      const combined = col(row, "fitmentCombined");
      if (combined) part.fitment.push(...parseFitmentCombined(combined));
    } else {
      // Format A
      const make = col(row, "fitmentMake");
      const model = col(row, "fitmentModel");
      const yearFrom = parseInt(col(row, "fitmentYearFrom"), 10);
      const yearTo = parseInt(col(row, "fitmentYearTo"), 10);
      if (make && model && !isNaN(yearFrom) && !isNaN(yearTo)) {
        part.fitment.push({ make, model, yearFrom, yearTo });
      }
    }
  }

  const parts = Array.from(partsMap.values());
  fs.writeFileSync(outPath, JSON.stringify(parts, null, 2));
  console.log(`✅  Converted ${parts.length} parts → ${outPath}`);
}

main();
