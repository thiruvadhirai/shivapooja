import type { Metadata } from 'next';
import SanskritClient from './SanskritClient';

export const metadata: Metadata = { title: 'Purusha Suktam in Sanskrit' };

export default function SanskritPage() {
  return <SanskritClient />;
}
