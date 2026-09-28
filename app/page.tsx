import Link from 'next/link';
import { Building2, Home, Landmark, ArrowRight, ShieldCheck, Users, Star } from 'lucide-react';
import { getProperties, getAgents } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import AgentCard from '@/components/AgentCard';

export const revalidate = 300;

export default async function HomePage() {
  const [propertiesRes, agentsRes] = await Promise.all([
    getProperties({ limit: 6, order_by: '-date_added' }).catch(() => ({ objects: [], meta: { total_count: 0, limit: 6, offset: 0, next: null, previous: null } })),
    getAgents().catch(() => ({ objects: [], meta: { total_count: 0, limit: 20, offset: 0, next: null, previous: null } })),
  ]);

  const properties = propertiesRes.objects;
  const agents = agentsRes.objects;
  const totalProperties = propertiesRes.meta.total_count;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              <Star className="w-3.5 h-3.5 fill-current" />
              Agenție imobiliară de încredere
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Vindem.
              <span className="text-amber-400 block">Nu doar promovăm.</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
              Imobicom SRL — agenție imobiliară dedicată rezultatelor reale.
              Portofoliu diversificat de proprietăți rezidențiale și comerciale, gestionate cu profesionalism.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/proprietati?type=sale"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Proprietăți de vânzare
              </Link>
              <Link
                href="/proprietati?type=rent"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors border border-white/20 flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                De închiriat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-amber-500 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-3 divide-x divide-amber-400">
            {[
              { icon: Building2, value: totalProperties > 0 ? `${totalProperties}+` : '50+', label: 'Proprietăți active' },
              { icon: Users, value: `${agents.length || 2}`, label: 'Consultanți imobiliari' },
              { icon: ShieldCheck, value: '100%', label: 'Tranzacții sigure' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-2 text-center sm:text-left">
                <Icon className="w-5 h-5 text-amber-100 shrink-0" />
                <div>
                  <div className="text-xl font-bold">{value}</div>
                  <div className="text-xs text-amber-100">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick search */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href: '/proprietati?property_type=apartment&type=sale', icon: Building2, label: 'Apartamente de vânzare' },
              { href: '/proprietati?property_type=house&type=sale', icon: Home, label: 'Case / Vile' },
              { href: '/proprietati?property_type=land&type=sale', icon: Landmark, label: 'Terenuri' },
              { href: '/proprietati?type=rent', icon: Building2, label: 'Proprietăți de închiriat' },
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:border-amber-300 hover:shadow-sm transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-xs font-medium text-gray-700 leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Proprietăți recente</h2>
            <p className="text-gray-500 mt-1 text-sm">Cele mai noi oferte din portofoliul nostru</p>
          </div>
          <Link
            href="/proprietati"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            Vezi toate <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <div className="flex justify-center mt-8 sm:hidden">
              <Link
                href="/proprietati"
                className="flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 border border-amber-300 px-4 py-2 rounded-lg"
              >
                Vezi toate <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Proprietățile sunt în curs de adăugare.</p>
            <p className="text-gray-400 text-sm mt-1">Reveniți curând sau contactați-ne direct.</p>
            <Link href="/contact" className="mt-4 inline-block bg-amber-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-amber-600 transition-colors">
              Contactează-ne
            </Link>
          </div>
        )}
      </section>

      {/* Why us */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">De ce să alegi Imobicom?</h2>
          <p className="text-gray-500 text-center text-sm mb-10">Expertiză și profesionalism în fiecare tranzacție</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Tranzacții sigure',
                desc: 'Toate tranzacțiile sunt gestionate legal, cu documente verificate și transparență totală.',
              },
              {
                icon: Users,
                title: 'Consultanți dedicați',
                desc: 'Echipa noastră te ghidează pas cu pas, de la vizionare până la semnarea contractului.',
              },
              {
                icon: Star,
                title: 'Portofoliu variat',
                desc: 'Apartamente, case, terenuri și spații comerciale — avem soluția potrivită pentru tine.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      {agents.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Echipa noastră</h2>
            <p className="text-gray-500 mt-1 text-sm">Consultanți imobiliari experiențați</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/agenti" className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 justify-center">
              Vezi toată echipa <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* CTA banner */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Gata să găsești proprietatea ideală?</h2>
          <p className="text-amber-100 mb-6 text-sm max-w-md mx-auto">
            Consultanții noștri sunt disponibili pentru a te ajuta să găsești cea mai bună ofertă.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="bg-white text-amber-600 font-semibold px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors">
              Contactează-ne
            </Link>
            <Link href="/proprietati" className="border border-white/50 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
              Caută proprietăți
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
