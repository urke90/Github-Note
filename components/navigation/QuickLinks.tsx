'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut } from '@/lib/actions/auth';

// ----------------------------------------------------------------

type Props = {};

const QuickLinks = (props: Props) => {
  return (
    <section className="flex flex-1 flex-col">
      <div>
        <p className="mb-5 text-[10px] uppercase text-white-500">Quick Links</p>
        <Link href="/" className="mb-5 flex items-center">
          <Image
            src="/assets/images/JSM-Pro-Logo.svg"
            width={16}
            height={16}
            alt="JS Mastery"
            className="mr-3"
          />
          <span className="p3-medium">JSM Courses</span>
        </Link>
        <Link href="/" className="mb-5 flex items-center">
          <Image
            src="/assets/images/github-outline.svg"
            width={16}
            height={16}
            alt="GitHub"
            className="mr-3"
          />
          <span className="p3-medium">GitHub Organization</span>
        </Link>
      </div>
      <div
        className="flex items-center"
        onClick={() => signOut({ redirectTo: '/login' })}
      >
        <Image
          src="/assets/images/JSM-Pro-Logo.svg"
          width={16}
          height={16}
          alt="Logout"
          className="mr-3"
        />
        <span className="p3-medium">Logout</span>
      </div>
    </section>
  );
};

export default QuickLinks;
