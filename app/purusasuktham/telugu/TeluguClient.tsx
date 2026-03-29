'use client';

import VerseLines from '../VerseLines';
import { useVerseData } from '../useVerseData';

export default function TeluguClient() {
  const { data, error } = useVerseData(['telugu']);
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <h1>Purusha Suktam — Telugu</h1>
      <VerseLines lines={data.telugu} />
    </>
  );
}
