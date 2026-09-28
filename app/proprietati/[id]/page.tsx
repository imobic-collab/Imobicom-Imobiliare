import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  BedDouble, Bath, Maximize2, MapPin, ArrowLeft, Phone, Calendar,
  Building2, Layers, Zap, CheckCircle2, Tag
} from 'lucide-react';
import type { Metadata } from 'next';
import { getProperty, getAgent, formatPrice, getPropertyAddress, getPropertyTitle, getPropertyMainImage } from '@/lib/api';
import ContactForm from '@/components/ContactForm';
import { PROPERTY_TYPES } from '@/lib/types';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(parseInt(id, 10)).catch(() => null);
  if (!property) return { title: 'Proprietate negăsită' };
  return {
    title: getPropertyTitle(property),
    description: property.description?.slice(0, 160) || undefined,
  };
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = await getProperty(parseInt(id, 10)).catch(() => null);
  if (!property) notFound();

  const agent = property.agent
    ? await getAgent(property.agent.id).catch(() => null)
    : null;

  const title = getPropertyTitle(property);
  const address = getPropertyAddress(property);
  const mainImage = getPropertyMainImage(property);
  const price = property.for_sale
    ? formatPrice(property.price_sale, property.currency_sale)
    : formatPrice(property.price_rent, property.currency_rent);

  const allImages = [
    ...(property.resized_images || []),
    ...(property.full_images || []),
  ].slice(0, 10);

  const features = [
    property.rooms != null && { label: 'Camere', value: property.rooms },
    property.bedrooms != null && { label: 'Dormitoare', value: property.bedrooms },
    property.bathrooms != null && { label: 'Băi', value: property.bathrooms },
    property.balconies != null && property.balconies > 0 && { label: 'Balcoane', value: property.balconies },
    property.surface_total != null && { label: 'Suprafață totală', value: `${property.surface_total} m²` },
    property.surface_built != null && { label: 'Suprafață construită', value: `${property.surface_built} m²` },
    property.surface_useable != null && { label: 'Suprafață utilă', value: `${property.surface_useable} m²` },
    property.surface_land != null && { label: 'Suprafață teren', value: `${property.surface_land} m²` },
    property.floor != null && { label: 'Etaj', value: property.verbose_floor || property.floor },
    property.building_floors != null && { label: 'Etaje total', value: property.building_floors },
    property.building_construction_year != null && { label: 'An construcție', value: property.building_construction_year },
    property.parking_spots != null && property.parking_spots > 0 && { label: 'Locuri parcare', value: property.parking_spots },
    property.energy_class && { label: 'Clasă energetică', value: property.energy_class },
    property.comfort && { label: 'Confort', value: property.comfort },
    property.interior_state && { label: 'Stare interioară', value: property.interior_state },
    property.partitioning && { label: 'Compartimentare', value: property.partitioning },
    property.construction_status && { label: 'Status construcție', value: property.construction_status },
  ].filter(Boolean) as { label: string; value: string | number }[];

  const badges = [
    property.for_sale && { label: 'De vânzare', color: 'bg-amber-500' },
    property.for_rent && { label: 'De închiriat', color: 'bg-blue-600' },
    property.zero_commission_sale && { label: '0% comision', color: 'bg-green-600' },
    property.exclusive_sale && { label: 'Exclusiv', color: 'bg-purple-600' },
  ].filter(Boolean) as { label: string; color: string }[];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <Link href="/proprietati" className="flex items-center gap-1 text-sm text-gray-500 hover:text-amber-600 w-fit">
            <ArrowLeft className="w-4 h-4" />
            Înapoi la proprietăți
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Title + badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {badges.map((b) => (
                <span key={b.label} className={`${b.color} text-white text-xs font-semibold px-2.5 py-1 rounded`}>
                  {b.label}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-6">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              {address}
            </div>

            {/* Images */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200 mb-3">
              <Image
                src={mainImage}
                alt={title}
                fill
                className="object-cover"
                priority
                unoptimized={!mainImage.startsWith('/')}
              />
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-8">
                {allImages.slice(1, 9).map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={img.url}
                      alt={`${title} - ${i + 2}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform cursor-pointer"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="text-3xl font-bold text-amber-600">{price}</div>
                  {property.negotiable_sale_price && (
                    <span className="text-sm text-green-600 font-medium">Preț negociabil</span>
                  )}
                  {property.verbose_price && (
                    <p className="text-xs text-gray-400 mt-0.5">{property.verbose_price}</p>
                  )}
                </div>
                {property.price_sqm_sale && (
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Preț / m²</div>
                    <div className="font-semibold text-gray-800">
                      {formatPrice(property.price_sqm_sale, property.currency_sale)} / m²
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Features grid */}
            {features.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-500" />
                  Caracteristici
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {features.map(({ label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                      <div className="font-semibold text-gray-800 text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property type info */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-500" />
                Detalii proprietate
              </h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {property.property_type && (
                  <div>
                    <span className="text-gray-500">Tip: </span>
                    <span className="font-medium">{PROPERTY_TYPES[property.property_type] || property.property_type}</span>
                  </div>
                )}
                {property.city && (
                  <div>
                    <span className="text-gray-500">Oraș: </span>
                    <span className="font-medium">{property.city}</span>
                  </div>
                )}
                {property.zone && (
                  <div>
                    <span className="text-gray-500">Zonă: </span>
                    <span className="font-medium">{property.zone}</span>
                  </div>
                )}
                {property.date_added && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-500">Adăugat: </span>
                    <span className="font-medium">
                      {new Date(property.date_added).toLocaleDateString('ro-RO')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Promo badges */}
            {(property.zero_commission_sale || property.exclusive_sale || property.zero_commission_rent) && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
                <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-500" />
                  Beneficii
                </h2>
                <div className="flex flex-wrap gap-2">
                  {property.zero_commission_sale && (
                    <div className="flex items-center gap-1.5 bg-green-50 text-green-700 text-sm px-3 py-1.5 rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      Fără comision vânzare
                    </div>
                  )}
                  {property.zero_commission_rent && (
                    <div className="flex items-center gap-1.5 bg-green-50 text-green-700 text-sm px-3 py-1.5 rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      Fără comision chirie
                    </div>
                  )}
                  {property.exclusive_sale && (
                    <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 text-sm px-3 py-1.5 rounded-full">
                      <Zap className="w-4 h-4" />
                      Ofertă exclusivă
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
                <h2 className="font-bold text-gray-900 mb-3">Descriere</h2>
                <div
                  className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: property.description }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Agent */}
              {agent && (
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Agent responsabil</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-amber-50 shrink-0">
                      {agent.avatar ? (
                        <Image src={agent.avatar} alt={`${agent.first_name} ${agent.last_name}`} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-amber-600 font-bold text-lg">
                          {agent.first_name[0]}{agent.last_name[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{agent.first_name} {agent.last_name}</div>
                      <div className="text-xs text-amber-600">{agent.position}</div>
                    </div>
                  </div>
                  <a
                    href={`tel:${agent.agent_phone || agent.phone}`}
                    className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {agent.agent_phone || agent.phone}
                  </a>
                </div>
              )}

              {/* Contact form */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Cere informații</h3>
                <ContactForm propertyId={property.id} propertyTitle={title} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
