import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4 bg-white rounded-lg inline-block px-3 py-2">
              <Image
                src="/logo.svg"
                alt="Imobicom SRL"
                width={140}
                height={78}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-amber-400 font-medium italic mb-2">
              „Vindem. Nu doar promovăm."
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Agenție imobiliară cu experiență în tranzacții de vânzare și închiriere
              de proprietăți rezidențiale și comerciale.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors text-xs border border-gray-700 px-3 py-1.5 rounded-lg" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors text-xs border border-gray-700 px-3 py-1.5 rounded-lg" aria-label="Instagram">
                Instagram
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigare rapidă</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/proprietati?type=sale', label: 'Proprietăți de vânzare' },
                { href: '/proprietati?type=rent', label: 'Proprietăți de închiriat' },
                { href: '/agenti', label: 'Echipa noastră' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-amber-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+40742994942" className="hover:text-amber-500 transition-colors">0742 994 942</a>
                  <span className="mx-2 text-gray-600">|</span>
                  <a href="tel:+40733174672" className="hover:text-amber-500 transition-colors">0733 174 672</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <a href="mailto:contact@imobicom.ro" className="hover:text-amber-500 transition-colors">
                  contact@imobicom.ro
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-gray-400">România</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Imobicom SRL. Toate drepturile rezervate.</p>
          <p>CUI 50846856</p>
        </div>
      </div>
    </footer>
  );
}
