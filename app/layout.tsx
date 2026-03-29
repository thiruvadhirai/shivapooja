'use client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ fontFamily: 'sans-serif', maxWidth: 960, margin: '0 auto', padding: '20px 16px' }}>
        {children}
      </body>
    </html>
  );
}
