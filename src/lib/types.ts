export interface Fitment {
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
}

export interface Part {
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

export interface FilterState {
  make: string;
  model: string;
  year: string;
  search: string;
  category: string;
}
