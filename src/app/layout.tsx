import type { Metadata } from 'next';
import './globals.css';
import { BASE_KEYWORDS } from '@/const/metadata';
import Header from '@/components/Header/Header';
import Providers from '@/components/Providers/Providers';

export const metadata: Metadata = {
  title: 'E-Library - Your Digital Book Collection',
  description: 'Browse our extensive collection of digital books',
  keywords: [...BASE_KEYWORDS],
  metadataBase: new URL('https://e-library-next-git-cmsintegration-dmitriykodenskiys-projects.vercel.app'),
  robots: {
    index: true,
    follow: true,
  }
}

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
