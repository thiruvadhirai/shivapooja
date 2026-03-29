'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export type Lang = 'sanskrit' | 'tamil' | 'telugu';

const FILE: Record<Lang, string> = {
  sanskrit: 'purusasuktaminsanskrit.md',
  tamil:    'purusasuktamintamil.md',
  telugu:   'purusasuktamintelugu.md',
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function useVerseData(langs: Lang[]) {
  const [data, setData] = useState<Record<Lang, string[]>>({ sanskrit: [], tamil: [], telugu: [] });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all(
      langs.map(lang =>
        axios.get<string>(`${BASE}/purusasuktham/${FILE[lang]}`).then(r => ({ lang, lines: r.data.split('\n') }))
      )
    )
      .then(results => {
        setData(prev => {
          const next = { ...prev };
          results.forEach(({ lang, lines }) => { next[lang] = lines; });
          return next;
        });
      })
      .catch(e => setError(e.message));
  }, []);

  return { data, error };
}
