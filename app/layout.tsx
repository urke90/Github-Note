import { inter } from './ui/fonts';

import type { Metadata } from 'next';

// fonts
import { Toaster } from '@/components/ui/toaster';
import SessionProvider from '@/context/SessionProvider';

import './globals.css';

// ----------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Github Note',
  description:
    'This is modern web application used by developers for making notes and tracking personal progress . Creating new components with code examples,writing down specific steps for installing external packages used for web applications, important steps to follow with providing screenshots helps developers to have all the data they need in one place.',
};

interface IRootLayout {
  readonly children: React.ReactNode;
}

const RootLayout: React.FC<IRootLayout> = async ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
