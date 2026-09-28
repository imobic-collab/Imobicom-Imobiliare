import { Phone, Mail, Award, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { getAgents } from '@/lib/api';
import AgentCard from '@/components/AgentCard';

export const metadata: Metadata = {
  title: 'Echipa noastră',
  description: 'Consultanții imobiliari Imobicom SRL — profesioniști dedicați cu experiență în tranzacții imobiliare.',
};

export const dynamic = 'force-dynamic';

export default async function AgentiPage() {
  const res = await getAgents().catch(() => ({ objects: [], meta: { total_count: 0, limit: 20, offset: 0, next: null, previous: null } }));
  const agents = res.objects;

  const founder = agents.find(
    (a) => a.last_name.toLowerCase().includes('cocosatu') || a.first_name.toLowerCase().includes('adrian')
  );
  const rest = agents.filter((a) => a.id !== founder?.id);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Echipa Imobicom</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Consultanți imobiliari profesioniști, dedicați să găsească soluția perfectă pentru fiecare client.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Founder spotlight */}
        {founder && (
          <div className="mb-14">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Fondator</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row">
                {/* Photo */}
                <div className="w-full md:w-72 h-80 md:h-96 shrink-0 bg-amber-50 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/adrian-cocosatu.jpg"
                    alt="Adrian Cocosatu - Fondator Imobicom SRL"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Info */}
                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                      <Award className="w-3.5 h-3.5" />
                      Fondator & Director
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {founder.first_name} {founder.last_name}
                    </h3>
                    <p className="text-amber-600 font-medium mb-4">{founder.position}</p>

                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Adrian Cocosatu este fondatorul agenției Imobicom SRL și consultant imobiliar autorizat,
                      cu o vastă experiență în tranzacții rezidențiale și comerciale. Prin profesionalism
                      și dedicare, a construit o agenție bazată pe principiul simplu:
                      <em className="text-amber-700 font-medium"> „Vindem. Nu doar promovăm."</em>
                    </p>

                    {/* APAIR badge */}
                    <a
                      href="https://apair.ro/membri/?apair_search=adrian+cocosatu&apair_city=&apair_member=1019"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors mb-6"
                    >
                      <Award className="w-4 h-4 text-blue-600" />
                      Membru APAIR (Asociația Profesională a Agențiilor Imobiliare din România)
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href={`tel:${founder.agent_phone || founder.phone}`}
                      className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {founder.agent_phone || founder.phone}
                    </a>
                    {founder.email && (
                      <a
                        href={`mailto:${founder.email}`}
                        className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {founder.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rest of team */}
        {rest.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Consultanți imobiliari</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {rest.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        )}

        {agents.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            Informații despre echipă în curând.
          </div>
        )}

        {/* APAIR info */}
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 max-w-3xl mx-auto text-center">
          <Award className="w-10 h-10 text-blue-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 text-lg mb-2">Membri APAIR</h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Imobicom SRL este reprezentată în <strong>APAIR</strong> — Asociația Profesională a Agențiilor Imobiliare
            din România, garant al standardelor de etică și profesionalism în industria imobiliară.
          </p>
          <a
            href="https://apair.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-blue-600 font-medium text-sm hover:underline"
          >
            Află mai multe despre APAIR <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
