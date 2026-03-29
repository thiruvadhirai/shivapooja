'use client';

import VerseLines from '../VerseLines';
import { useVerseData } from '../useVerseData';

export default function SanskritClient() {
  const { data, error } = useVerseData(['sanskrit']);
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <h1>Purusha Suktam — Sanskrit</h1>
      <VerseLines lines={data.sanskrit} />
    </>
  );
}
