'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const PROPERTY_TYPES = [
  { value: '', label: 'Toate tipurile' },
  { value: 'apartment', label: 'Apartament' },
  { value: 'house', label: 'Casă / Vilă' },
  { value: 'land', label: 'Teren' },
  { value: 'commercial', label: 'Spațiu comercial' },
  { value: 'office', label: 'Birou' },
];

const ROOMS_OPTIONS = [
  { value: '', label: 'Orice' },
  { value: '1', label: '1 cameră' },
  { value: '2', label: '2 camere' },
  { value: '3', label: '3 camere' },
  { value: '4', label: '4+ camere' },
];

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete('page'); // reset pagination
      router.push(`/proprietati?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700">
        <SlidersHorizontal className="w-4 h-4 text-amber-500" />
        Filtrează proprietăți
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {/* Transaction type */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Tip tranzacție</label>
          <select
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={searchParams.get('type') || ''}
            onChange={(e) => updateFilter('type', e.target.value)}
          >
            <option value="">Toate</option>
            <option value="sale">De vânzare</option>
            <option value="rent">De închiriat</option>
          </select>
        </div>

        {/* Property type */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Tip proprietate</label>
          <select
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={searchParams.get('property_type') || ''}
            onChange={(e) => updateFilter('property_type', e.target.value)}
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Oraș</label>
          <input
            type="text"
            placeholder="ex: București"
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            defaultValue={searchParams.get('city') || ''}
            onBlur={(e) => updateFilter('city', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') updateFilter('city', (e.target as HTMLInputElement).value);
            }}
          />
        </div>

        {/* Rooms */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Camere</label>
          <select
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={searchParams.get('rooms') || ''}
            onChange={(e) => updateFilter('rooms', e.target.value)}
          >
            {ROOMS_OPTIONS.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>

        {/* Price range */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">Preț (EUR)</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              defaultValue={searchParams.get('price_min') || ''}
              onBlur={(e) => updateFilter('price_min', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              defaultValue={searchParams.get('price_max') || ''}
              onBlur={(e) => updateFilter('price_max', e.target.value)}
            />
          </div>
        </div>

        {/* Surface */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">Suprafață (m²)</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              defaultValue={searchParams.get('surface_min') || ''}
              onBlur={(e) => updateFilter('surface_min', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              defaultValue={searchParams.get('surface_max') || ''}
              onBlur={(e) => updateFilter('surface_max', e.target.value)}
            />
          </div>
        </div>

        {/* Sort */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">Sortare</label>
          <select
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={searchParams.get('order_by') || '-date_added'}
            onChange={(e) => updateFilter('order_by', e.target.value)}
          >
            <option value="-date_added">Cele mai noi</option>
            <option value="date_added">Cele mai vechi</option>
            <option value="price_sale">Preț crescător</option>
            <option value="-price_sale">Preț descrescător</option>
            <option value="surface_total">Suprafață crescătoare</option>
            <option value="-surface_total">Suprafață descrescătoare</option>
          </select>
        </div>

        {/* Reset */}
        <div className="sm:col-span-2 lg:col-span-1">
          <button
            onClick={() => router.push('/proprietati')}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Search className="w-4 h-4" />
            Resetează filtrele
          </button>
        </div>
      </div>
    </div>
  );
}
