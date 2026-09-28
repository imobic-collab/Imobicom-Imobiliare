import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Imobicom SRL - Agenție Imobiliară',
    template: '%s | Imobicom SRL',
  },
  description:
    'Imobicom SRL - Agenție imobiliară de încredere. Proprietăți de vânzare și închiriere: apartamente, case, terenuri, spații comerciale.',
  keywords: ['imobiliare', 'apartamente de vânzare', 'case de vânzare', 'agenție imobiliară', 'Imobicom'],
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    siteName: 'Imobicom SRL',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
