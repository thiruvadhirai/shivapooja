'use client';

import ReactMarkdown from 'react-markdown';

interface Props {
  lines: string[];
}

export default function VerseLines({ lines }: Props) {
  if (!lines.length) return <p>Loading…</p>;
  return (
    <div style={{ lineHeight: 1.8, fontSize: '1em' }}>
      {lines.map((line, i) => (
        <ReactMarkdown key={i}>{line || '\u00A0'}</ReactMarkdown>
      ))}
    </div>
  );
}
