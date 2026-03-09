"use client";

interface VehicleFilterProps {
  makes: string[];
  models: string[];
  years: number[];
  selectedMake: string;
  selectedModel: string;
  selectedYear: string;
  onMakeChange: (make: string) => void;
  onModelChange: (model: string) => void;
  onYearChange: (year: string) => void;
  onClear: () => void;
}

export default function VehicleFilter({
  makes,
  models,
  years,
  selectedMake,
  selectedModel,
  selectedYear,
  onMakeChange,
  onModelChange,
  onYearChange,
  onClear,
}: VehicleFilterProps) {
  return (
    <div className="bg-slate-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Find Parts for Your Vehicle
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          {/* Make */}
          <select
            value={selectedMake}
            onChange={(e) => onMakeChange(e.target.value)}
            className="bg-slate-800 border border-slate-600 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[140px]"
          >
            <option value="">All Makes</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>

          {/* Model */}
          <select
            value={selectedModel}
            onChange={(e) => onModelChange(e.target.value)}
            disabled={!selectedMake}
            className="bg-slate-800 border border-slate-600 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[140px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <option value="">All Models</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            disabled={!selectedModel}
            className="bg-slate-800 border border-slate-600 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[110px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>

          {selectedMake && (
            <button
              onClick={onClear}
              className="text-sm text-slate-300 hover:text-red-400 transition-colors underline underline-offset-2"
            >
              Clear vehicle
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
