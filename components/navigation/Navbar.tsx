'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import Link from 'next/link';
import { signOut } from '@/lib/actions/auth';
import NavPostItem from '../post/PostItem';
import CreateOrSearchForPost from '../post/CreateOrSearchForPost';
import PostsList from '../post/PostsList';

import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';

// ----------------------------------------------------------------

const Navbar: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/assets/images/burger.svg"
          width={30}
          height={30}
          alt="Menu"
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent>
        <header className="flex-between mb-8 ">
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
          <SheetClose>
            <X className="text-white-100" />
          </SheetClose>
        </header>
        <div className="mb-6">
          <CreateOrSearchForPost />
        </div>
        <section className="mb-6 border-y-[0.68px] border-white-500 py-6">
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
        </section>
        <PostsList />
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;

/* <header className="flex-between mb-8">
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
          </header>
          <section className="mb-6">
            <Button variant="gradient" className="mb-4 text-white-100">
              <Image
                src="/assets/images/Plus.svg"
                width={14}
                height={14}
                alt="Add"
              />
              <p className="p4-medium !text-white-100">Create Post</p>
            </Button>
            <SearchCommandDialog />
          </section>
          <section className="mb-6 border-y-[0.68px] border-white-500 py-6">
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
          </section>
          <section>
            <p className="mb-5 text-[10px] uppercase text-white-500">Posts</p>
            <ul>
              <NavPostItem type="workflow" postText="Project setup" />
              <NavPostItem type="component" postText="Mobile Navigation" />
              <NavPostItem type="knowledge" postText="Design System" />
            </ul>
          </section> */
