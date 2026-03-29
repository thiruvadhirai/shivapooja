'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <h1>Shiva Pooja</h1>
      <ul>
        <li><Link href="/panchangam">Panchangam</Link></li>
        <li><Link href="/purusasuktham">Purusa Suktham</Link></li>
      </ul>
    </>
  );
}
