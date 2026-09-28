import { Phone, Mail, MapPin, Clock, Award, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { getAgents } from '@/lib/api';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactează echipa Imobicom SRL pentru informații despre proprietăți sau pentru o consultație gratuită.',
};

export const revalidate = 3600;

export default async function ContactPage() {
  const res = await getAgents().catch(() => ({ objects: [] }));
  const agents = res.objects;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Contactează-ne</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Suntem aici să te ajutăm. Trimite-ne un mesaj sau sună-ne direct.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="space-y-5">
            {/* Info card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-5">Informații de contact</h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-700 mb-0.5">Telefon</div>
                    {agents.map((a) => (
                      <div key={a.id}>
                        <a href={`tel:${a.agent_phone || a.phone}`} className="text-gray-600 hover:text-amber-600 block">
                          {a.agent_phone || a.phone} — {a.first_name} {a.last_name}
                        </a>
                      </div>
                    ))}
                    {agents.length === 0 && (
                      <>
                        <a href="tel:+40742994942" className="text-gray-600 hover:text-amber-600 block">0742 994 942</a>
                        <a href="tel:+40733174672" className="text-gray-600 hover:text-amber-600 block">0733 174 672</a>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-700 mb-0.5">Email</div>
                    <a href="mailto:contact@imobicom.ro" className="text-gray-600 hover:text-amber-600">
                      contact@imobicom.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-700 mb-0.5">Locație</div>
                    <span className="text-gray-600">București, România</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-700 mb-0.5">Program</div>
                    <div className="text-gray-600">Luni–Vineri: 09:00–18:00</div>
                    <div className="text-gray-600">Sâmbătă: 10:00–14:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* APAIR badge */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900 text-sm">Membri APAIR</span>
              </div>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Adrian Cocosatu, fondatorul Imobicom SRL, este membru al Asociației Profesionale
                a Agențiilor Imobiliare din România — garant al profesionalismului și eticii.
              </p>
              <a
                href="https://apair.ro/membri/?apair_search=adrian+cocosatu&apair_city=&apair_member=1019"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
              >
                Vezi profilul APAIR <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Direct call CTA */}
            <a
              href="tel:+40742994942"
              className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4" />
              Sună acum: 0742 994 942
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h2 className="font-bold text-gray-900 text-lg mb-1">Trimite-ne un mesaj</h2>
            <p className="text-sm text-gray-500 mb-6">Îți răspundem în cel mai scurt timp posibil.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
