import { Agent, ApiResponse, ContactRequest, Property, PropertyFilters, ResidentialComplex } from './types';

const BASE_URL = process.env.CRMREBS_BASE_URL || 'https://imobicom-srl.crmrebs.com/api/public';
const API_KEY = process.env.CRMREBS_API_KEY || '';

function buildUrl(endpoint: string, params: Record<string, string | number | boolean | undefined> = {}): string {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function fetchApi<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: 300 }, // 5 minute cache
    headers: { 'Accept': 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export async function getProperties(filters: PropertyFilters = {}): Promise<ApiResponse<Property>> {
  const params: Record<string, string | number | boolean | undefined> = {
    limit: filters.limit ?? 20,
    offset: filters.offset ?? 0,
    order_by: filters.order_by ?? '-date_added',
  };

  if (filters.for_sale !== undefined) params.for_sale = filters.for_sale;
  if (filters.for_rent !== undefined) params.for_rent = filters.for_rent;
  if (filters.property_type) params.property_type = filters.property_type;
  if (filters.city) params.city = filters.city;
  if (filters.rooms) params.rooms = filters.rooms;
  if (filters.price_min) params.price_sale__gte = filters.price_min;
  if (filters.price_max) params.price_sale__lte = filters.price_max;
  if (filters.surface_min) params.surface_total__gte = filters.surface_min;
  if (filters.surface_max) params.surface_total__lte = filters.surface_max;

  const url = buildUrl('/property/', params);
  return fetchApi<ApiResponse<Property>>(url);
}

export async function getProperty(id: number): Promise<Property> {
  const url = buildUrl(`/property/${id}/`);
  return fetchApi<Property>(url);
}

export async function getAgents(): Promise<ApiResponse<Agent>> {
  const url = buildUrl('/agent/', { limit: 50 });
  return fetchApi<ApiResponse<Agent>>(url);
}

export async function getAgent(id: number): Promise<Agent> {
  const url = buildUrl(`/agent/${id}/`);
  return fetchApi<Agent>(url);
}

export async function getResidentialComplexes(): Promise<ApiResponse<ResidentialComplex>> {
  const url = buildUrl('/residentialcomplex/', { limit: 50 });
  return fetchApi<ApiResponse<ResidentialComplex>>(url);
}

export async function submitContactRequest(data: ContactRequest): Promise<{ success: boolean; contact?: number; request?: number }> {
  const url = `${BASE_URL}/addrequest/?api_key=${API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  return res.json();
}

export function formatPrice(price: number | null, currency: string = 'EUR'): string {
  if (!price) return 'Preț la cerere';
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: currency === 'EUR' ? 'EUR' : 'RON',
    maximumFractionDigits: 0,
  }).format(price);
}

export function getPropertyMainImage(property: Property): string {
  if (property.resized_images && property.resized_images.length > 0) {
    return property.resized_images[0].url;
  }
  if (property.full_images && property.full_images.length > 0) {
    return property.full_images[0].url;
  }
  if (property.thumbnail) return property.thumbnail;
  return '/placeholder-property.jpg';
}

export function getPropertyTitle(property: Property): string {
  if (property.title) return property.title;
  const type = property.property_type || 'Proprietate';
  const city = property.city || '';
  return `${type} ${city}`.trim();
}

export function getPropertyAddress(property: Property): string {
  const parts = [property.street, property.zone, property.city].filter(Boolean);
  return parts.join(', ') || 'Locație nedisponibilă';
}
