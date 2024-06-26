import type { Metadata } from 'next';
// fonts
import { inter } from '../ui/fonts';
import SessionProvider from '@/components/auth/SessionProvider';
import { ToastContainer } from 'react-toastify';
import MobileNav from '@/components/navigation/MobileNav';

import { auth } from '@/auth';

import '../globals.css';

// ----------------------------------------------------------------

interface ILayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <section className="flex h-screen">
      <div className="flex flex-1 flex-col">{children}</div>
    </section>
  );
};

export default RootLayout;

// ----------------------------------------------------------------

/**
 * 1. prvo zavrsiti header(mobile) sa sidebar-om  -> 1 bracnh
 * 2. iz te ggrane krenuti Post model u bazi, tag model u bazi, spojiti sa userom, actione za create post, fetch post, action za filtriranje postova, filtriranje po tagovima (desno sidebar), (worlklow, knowdledgde, component) => mora imati pginaciju u server actionu () (NOV BRANCH)
 * 3. HOME page (vidcemo)
 * 4. https://nextjs.org/docs/app/building-your-application/caching
 * 5. https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
