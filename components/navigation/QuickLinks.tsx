'use client';

import Image from 'next/image';
import Link from 'next/link';

import { signOut } from '@/lib/actions/auth';

// ----------------------------------------------------------------

const QuickLinks: React.FC = () => {
  return (
    <section className="flex flex-1 flex-col">
      <div>
        <p className="mb-5 text-[10px] uppercase text-white-500">Quick Links</p>
        <Link href="/" className="p3-medium mb-5 flex items-center gap-3">
          <Image
            src="/assets/images/github-outline.svg"
            width={16}
            height={16}
            alt="GitHub"
          />
          GitHub
        </Link>
      </div>
      <div
        className="p3-medium flex items-center gap-3"
        onClick={() => signOut({ redirectTo: '/login' })}
      >
        <Image
          src="/assets/icons/logout.svg"
          width={16}
          height={16}
          alt="Logout"
        />
        Logout
      </div>
    </section>
  );
};

export default QuickLinks;
