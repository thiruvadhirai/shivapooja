import type { Metadata } from 'next';
import TeluguClient from './TeluguClient';

export const metadata: Metadata = { title: 'Purusha Suktam in Telugu' };

export default function TeluguPage() {
  return <TeluguClient />;
}
