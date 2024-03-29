'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  // DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerOverlay,
  // DrawerPortal,
} from '../ui/drawer';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Plus, Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import Link from 'next/link';
import { signOut } from '@/lib/actions/auth';

// 1. https://nextjs.org/docs/app/building-your-application/caching
// 2. https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// 3. search je zapravo shadcn commend

// ----------------------------------------------------------------

interface ISideDrawerProps {
  direction?: 'top' | 'bottom' | 'left' | 'right';
  drawerTrigger: React.ReactNode;
}

const SideDrawer: React.FC<ISideDrawerProps> = ({
  drawerTrigger,
  direction = 'right',
}) => {
  return (
    <Drawer direction={direction}>
      <DrawerTrigger asChild>{drawerTrigger}</DrawerTrigger>
      {/* <DrawerOverlay className="fixed inset-0" /> */}
      <DrawerContent className="w-[322px] px-5 py-8">
        <DrawerHeader>
          <div className="flex-between mb-8">
            <div className="flex">
              <Image
                src="/assets/images/github.png"
                width={36}
                height={36}
                alt="Profile Image"
                className="mr-4"
              />
              <div>
                <p className="p3-medium text-white-100">Uros Bijelic</p>
                <p className="p4-regular">urosbijelic90@gmail.com</p>
              </div>
            </div>
            <DrawerClose>
              <X className="text-white-100" />
            </DrawerClose>
          </div>
          <div className="mb-6">
            <Button className="mb-4">
              <Image
                src="/assets/images/Plus.svg"
                width={14}
                height={14}
                alt="Add"
              />
              Create Post
            </Button>
            {/* <Button variant="secondary">
              <div>
                <Search className="" />
                Search
              </div>
            </Button> */}
            <div className="relative grid w-full max-w-sm items-center gap-1.5">
              <div className="flex items-center">
                <Search className="size-[13px]" />
                Search
              </div>
              <Input type="email" id="email" placeholder="Email" />
            </div>
          </div>
          <div className="border-y-[0.68px] border-white-500 py-6">
            <p className="mb-5 text-[10px] uppercase text-white-500">
              Quick Links
            </p>
            <ul>
              <li>
                <Link href="/" className="mb-5 flex items-center">
                  <Image
                    src="/assets/images/JSM-Pro-Logo.svg"
                    width={16}
                    height={16}
                    alt="JS Mastery"
                    className="mr-3"
                  />
                  JSM Courses
                </Link>
              </li>
              <li>
                <Link href="/" className="mb-5 flex items-center">
                  <Image
                    src="/assets/images/github-outline.svg"
                    width={16}
                    height={16}
                    alt="GitHub"
                    className="mr-3"
                  />
                  GitHub Organization
                </Link>
              </li>
              <li
                className="mb-5 flex items-center"
                onClick={() => signOut({ redirectTo: '/login' })}
              >
                <Image
                  src="/assets/images/JSM-Pro-Logo.svg"
                  width={16}
                  height={16}
                  alt="Logout"
                  className="mr-3"
                />
                Logout
              </li>
            </ul>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
