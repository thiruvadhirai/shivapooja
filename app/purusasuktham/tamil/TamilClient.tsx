'use client';

import VerseLines from '../VerseLines';
import { useVerseData } from '../useVerseData';

export default function TamilClient() {
  const { data, error } = useVerseData(['tamil']);
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <h1>Purusha Suktam — Tamil</h1>
      <VerseLines lines={data.tamil} />
    </>
  );
}
