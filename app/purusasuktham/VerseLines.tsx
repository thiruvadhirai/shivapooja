'use client';

interface Props {
  lines: string[];
}

export default function VerseLines({ lines }: Props) {
  if (!lines.length) return <p>Loading…</p>;
  return (
    <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, fontSize: '1em' }}>
      {lines.map((line, i) => (
        <div key={i}>{line || '\u00A0'}</div>
      ))}
    </div>
  );
}
