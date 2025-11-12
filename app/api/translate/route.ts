import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, target } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    const res = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: target || 'hi',
        format: 'text',
      }),
    });

    const data = await res.json();

    if (data.error) throw new Error(data.error);

    return NextResponse.json({ translation: data.translatedText });
  } catch (err) {
    console.error('Translation error:', err);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
