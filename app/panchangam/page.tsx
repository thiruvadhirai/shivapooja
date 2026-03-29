import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Panchangam' };

const lines = [
  'Krouncha Dweepe',
  'Ramanaka Varshe',
  'Aindra Khande',
  'Nisqually Nadi theere',
  'Olympia Maha Nagare',
  'Swagruhe',
  'Viswavasu Nama samvatsare',
  'Phalguna Maase',
  'Trayodasi todo',
  'Ravivasare',
  'Pooram Nakshatre',
];

export default function PanchangamPage() {
  return (
    <>
      <h1>Panchangam</h1>
      <ol>
        {lines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ol>
    </>
  );
}
