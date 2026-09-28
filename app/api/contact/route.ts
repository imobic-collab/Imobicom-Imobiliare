import { NextRequest, NextResponse } from 'next/server';
import { submitContactRequest } from '@/lib/api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message, propertyId } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Numele și telefonul sunt obligatorii.' }, { status: 400 });
    }

    const result = await submitContactRequest({
      name,
      phone,
      email: email || '',
      message: message || '',
      lead_source: 'website',
      lead_property: propertyId || undefined,
      external_id: `web-${Date.now()}`,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'A apărut o eroare. Vă rugăm să ne contactați direct.' },
      { status: 500 }
    );
  }
}
