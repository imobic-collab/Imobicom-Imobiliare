import Link from 'next/link';
import Image from 'next/image';
import { BedDouble, Bath, Maximize2, MapPin, Tag } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatPrice, getPropertyMainImage, getPropertyTitle, getPropertyAddress } from '@/lib/api';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const image = getPropertyMainImage(property);
  const title = getPropertyTitle(property);
  const address = getPropertyAddress(property);
  const isForSale = property.for_sale;
  const isForRent = property.for_rent;
  const price = isForSale
    ? formatPrice(property.price_sale, property.currency_sale)
    : formatPrice(property.price_rent, property.currency_rent);

  return (
    <Link href={`/proprietati/${property.id}`} className={cn('group block', className)}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={!image.startsWith('/')}
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {isForSale && (
              <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded">
                De vânzare
              </span>
            )}
            {isForRent && (
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                De închiriat
              </span>
            )}
            {property.zero_commission_sale && (
              <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                0% comision
              </span>
            )}
            {property.exclusive_sale && (
              <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                <Tag className="w-3 h-3" /> Exclusiv
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="text-xl font-bold text-amber-600 mb-1">{price}</div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {title}
          </h3>

          {/* Address */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">{address}</span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-3 text-xs text-gray-600 border-t border-gray-100 pt-3">
            {property.rooms != null && (
              <div className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-gray-400" />
                <span>{property.rooms} cam.</span>
              </div>
            )}
            {property.bathrooms != null && (
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-gray-400" />
                <span>{property.bathrooms} băi</span>
              </div>
            )}
            {property.surface_total != null && (
              <div className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                <span>{property.surface_total} m²</span>
              </div>
            )}
            {property.floor != null && (
              <div className="ml-auto text-gray-400">
                Etaj {property.floor}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
