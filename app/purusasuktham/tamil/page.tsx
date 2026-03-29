import type { Metadata } from 'next';
import TamilClient from './TamilClient';

export const metadata: Metadata = { title: 'Purusha Suktam in Tamil' };

export default function TamilPage() {
  return <TamilClient />;
}
