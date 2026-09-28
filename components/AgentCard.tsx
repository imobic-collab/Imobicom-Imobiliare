import Image from 'next/image';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Agent } from '@/lib/types';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent: a }: AgentCardProps) {
  const fullName = `${a.first_name} ${a.last_name}`;
  const phone = a.agent_phone || a.phone;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center">
      {/* Avatar */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4 ring-4 ring-amber-50">
        {a.avatar ? (
          <Image
            src={a.avatar}
            alt={fullName}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-amber-50 text-amber-600 text-2xl font-bold">
            {a.first_name[0]}{a.last_name[0]}
          </div>
        )}
      </div>

      <h3 className="font-bold text-gray-900 text-lg">{fullName}</h3>
      <p className="text-sm text-amber-600 font-medium mb-4">{a.position}</p>

      <div className="w-full space-y-2">
        <a
          href={`tel:${phone}`}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-all"
        >
          <Phone className="w-4 h-4" />
          {phone}
        </a>

        {a.whatsapp_phone && (
          <a
            href={`https://wa.me/${a.whatsapp_phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg border border-green-200 text-sm text-green-700 hover:bg-green-50 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        )}

        {a.email && (
          <a
            href={`mailto:${a.email}`}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span className="truncate">{a.email}</span>
          </a>
        )}
      </div>
    </div>
  );
}
