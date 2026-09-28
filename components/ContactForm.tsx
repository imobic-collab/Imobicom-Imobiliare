'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  propertyId?: number;
  propertyTitle?: string;
}

export default function ContactForm({ propertyId, propertyTitle }: ContactFormProps) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          propertyId,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', phone: '', email: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Eroare la trimitere');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Eroare necunoscută');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
        <h3 className="font-bold text-lg text-gray-900 mb-1">Mesaj trimis cu succes!</h3>
        <p className="text-sm text-gray-500">Un consultant vă va contacta în cel mai scurt timp.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-amber-600 hover:underline"
        >
          Trimite un alt mesaj
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {propertyTitle && (
        <div className="text-xs text-gray-500 bg-amber-50 border border-amber-100 rounded-lg p-2">
          Interesați de: <span className="font-medium text-gray-700">{propertyTitle}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Nume complet *</label>
        <input
          type="text"
          required
          placeholder="Ion Popescu"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Telefon *</label>
        <input
          type="tel"
          required
          placeholder="07XX XXX XXX"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
        <input
          type="email"
          placeholder="email@exemplu.ro"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Mesaj</label>
        <textarea
          rows={4}
          placeholder="Scrieți mesajul dvs. aici..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        <Send className="w-4 h-4" />
        {status === 'loading' ? 'Se trimite...' : 'Trimite mesaj'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        * Câmpuri obligatorii. Datele dvs. sunt protejate conform GDPR.
      </p>
    </form>
  );
}
