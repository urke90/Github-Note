import type { Metadata } from 'next';
// fonts
import { inter } from './ui/fonts';
import SessionProvider from '@/components/auth/SessionProvider';
import { ToastContainer } from 'react-toastify';

import { auth } from '@/auth';

import './globals.css';

// ----------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          {children}
          <ToastContainer closeOnClick newestOnTop />
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
