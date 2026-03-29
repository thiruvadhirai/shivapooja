import type { Metadata } from 'next';
import PurusasukthamClient from './PurusasukthamClient';

export const metadata: Metadata = { title: 'Purusha Suktam' };

export default function PurusasukthamPage() {
  return <PurusasukthamClient />;
}
