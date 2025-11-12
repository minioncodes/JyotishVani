'use client';
import { useState } from 'react';

export default function Translate() {
  const [loading, setLoading] = useState(false);
  const [translated, setTranslated] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);

    // Grab all text (basic version)
    const text = document.body.innerText;

    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        target: translated ? 'en' : 'hi',
      }),
    });

    const data = await res.json();

    if (data.translation) {
      document.body.innerText = data.translation;
      setTranslated(!translated);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleTranslate}
      disabled={loading}
      style={{
        background: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: 4,
        padding: '8px 14px',
        cursor: 'pointer',
      }}
    >
      {loading
        ? 'Translating...'
        : translated
        ? 'Back to English'
        : 'Translate to Hindi'}
    </button>
  );
}
