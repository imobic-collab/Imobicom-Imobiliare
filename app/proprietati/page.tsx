import { Suspense } from 'react';
import { Building2 } from 'lucide-react';
import type { Metadata } from 'next';
import { getProperties } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import Pagination from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'Proprietăți',
  description: 'Caută proprietăți de vânzare sau închiriere din portofoliul Imobicom SRL.',
};

const PAGE_SIZE = 12;

interface SearchParams {
  type?: string;
  property_type?: string;
  city?: string;
  rooms?: string;
  price_min?: string;
  price_max?: string;
  surface_min?: string;
  surface_max?: string;
  order_by?: string;
  page?: string;
}

export default async function ProprietatiPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || '1', 10));
  const offset = (page - 1) * PAGE_SIZE;

  const filters = {
    limit: PAGE_SIZE,
    offset,
    for_sale: params.type === 'sale' ? true : undefined,
    for_rent: params.type === 'rent' ? true : undefined,
    property_type: params.property_type || undefined,
    city: params.city || undefined,
    rooms: params.rooms ? parseInt(params.rooms, 10) : undefined,
    price_min: params.price_min ? parseInt(params.price_min, 10) : undefined,
    price_max: params.price_max ? parseInt(params.price_max, 10) : undefined,
    surface_min: params.surface_min ? parseInt(params.surface_min, 10) : undefined,
    surface_max: params.surface_max ? parseInt(params.surface_max, 10) : undefined,
    order_by: params.order_by || '-date_added',
  };

  const result = await getProperties(filters).catch(() => ({
    objects: [],
    meta: { total_count: 0, limit: PAGE_SIZE, offset: 0, next: null, previous: null },
  }));

  const properties = result.objects;
  const total = result.meta.total_count;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const typeLabel =
    params.type === 'sale' ? 'de vânzare' : params.type === 'rent' ? 'de închiriat' : '';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Proprietăți {typeLabel}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {total > 0 ? `${total} proprietăți găsite` : 'Nicio proprietate găsită'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
          <aside className="lg:w-72 shrink-0">
            <Suspense fallback={<div className="h-96 bg-white rounded-xl border border-gray-100 animate-pulse" />}>
              <PropertyFilters />
            </Suspense>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {properties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination currentPage={page} totalPages={totalPages} />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100">
                <Building2 className="w-12 h-12 text-gray-200 mb-3" />
                <p className="text-gray-500 font-medium">Nicio proprietate găsită</p>
                <p className="text-gray-400 text-sm mt-1">Încearcă să modifici filtrele de căutare.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
