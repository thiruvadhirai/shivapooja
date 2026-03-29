import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Shiva Pooja', template: '%s | Shiva Pooja' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`iframe { border: none; display: block; margin: 0; }`}</style>
      </head>
      <body style={{ fontFamily: 'sans-serif', margin: 0, padding: '20px 0' }}>
        {children}
      </body>
    </html>
  );
}
