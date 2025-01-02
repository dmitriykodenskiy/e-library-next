import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Providers from '@/components/Providers/Providers';

export const metadata: Metadata = {
  title: 'e-library',
  description: 'The best e-library in the world',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
