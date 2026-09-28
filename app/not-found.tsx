import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-8xl font-bold text-amber-200 mb-4">404</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Pagina nu a fost găsită</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        Pagina pe care o cauți nu există sau a fost mutată.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          <Home className="w-4 h-4" />
          Acasă
        </Link>
        <Link
          href="/proprietati"
          className="flex items-center gap-2 border border-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Search className="w-4 h-4" />
          Caută proprietăți
        </Link>
      </div>
    </div>
  );
}
