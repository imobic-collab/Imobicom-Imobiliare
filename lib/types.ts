export interface Property {
  id: number;
  internal_id: string;
  resource_uri: string;
  title: string;
  description: string;
  city: string;
  region: string;
  street: string;
  zone: string;
  agency_zone: string;
  landmark: string;
  lat: number | null;
  lng: number | null;
  property_type: string;
  apartment_type: string;
  building_type: string;
  house_type: string;
  for_sale: boolean;
  for_rent: boolean;
  availability: string;
  price_sale: number | null;
  price_rent: number | null;
  price_sqm_sale: number | null;
  price_sqm_rent: number | null;
  verbose_price: string;
  currency_sale: string;
  currency_rent: string;
  negotiable_sale_price: boolean;
  negotiable_rent_price: boolean;
  surface_total: number | null;
  surface_built: number | null;
  surface_useable: number | null;
  surface_land: number | null;
  surface_balconies: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  rooms: number | null;
  kitchens: number | null;
  balconies: number | null;
  terraces: number | null;
  garages: number | null;
  parking_spots: number | null;
  floor: number | null;
  verbose_floor: string;
  building_floors: number | null;
  building_construction_year: number | null;
  construction_status: string;
  interior_state: string;
  comfort: string;
  energy_class: string;
  partitioning: string;
  orientation: string;
  thumbnail: string | null;
  full_images: PropertyImage[];
  resized_images: PropertyImage[];
  video_link: string | null;
  virtual_tour_link: string | null;
  date_added: string;
  date_modified: string;
  agent: AgentRef | null;
  promote_featured: boolean;
  promote_carousel: boolean;
  zero_commission_sale: boolean;
  zero_commission_rent: boolean;
  exclusive_sale: boolean;
  exclusive_rent: boolean;
  residential_complex: ResidentialComplexRef | null;
  tags: string[];
}

export interface PropertyImage {
  url: string;
  width?: number;
  height?: number;
}

export interface AgentRef {
  id: number;
  resource_uri: string;
}

export interface ResidentialComplexRef {
  id: number;
  resource_uri: string;
}

export interface Agent {
  id: number;
  resource_uri: string;
  first_name: string;
  last_name: string;
  phone: string;
  agent_phone: string;
  whatsapp_phone: string;
  email: string;
  avatar: string | null;
  position: string;
  is_active: boolean;
}

export interface ResidentialComplex {
  id: number;
  resource_uri: string;
  name: string;
  city: string;
  description: string;
  thumbnail: string | null;
  full_images: PropertyImage[];
}

export interface ApiResponse<T> {
  meta: {
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
    total_count: number;
  };
  objects: T[];
}

export interface PropertyFilters {
  for_sale?: boolean;
  for_rent?: boolean;
  property_type?: string;
  city?: string;
  rooms?: number;
  price_min?: number;
  price_max?: number;
  surface_min?: number;
  surface_max?: number;
  order_by?: string;
  limit?: number;
  offset?: number;
}

export interface ContactRequest {
  name: string;
  phone: string;
  email: string;
  message: string;
  lead_source: string;
  lead_property?: number;
  external_id: string;
}

export const PROPERTY_TYPES: Record<string, string> = {
  apartment: 'Apartament',
  house: 'Casă / Vilă',
  land: 'Teren',
  commercial: 'Spațiu comercial',
  office: 'Birou',
  industrial: 'Industrial / Depozit',
  garage: 'Garaj',
  special: 'Special',
};

export const TRANSACTION_LABELS: Record<string, string> = {
  sale: 'De vânzare',
  rent: 'De închiriat',
};
