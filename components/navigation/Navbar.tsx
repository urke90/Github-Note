import Image from 'next/image';
import { X } from 'lucide-react';
import CreateOrSearchForPost from '../post/CreateOrSearchForPost';
import PostsList from './NavPostsList';
import NavProfileInfo from '../shared/NavProfileInfo';

import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import QuickLinks from './QuickLinks';

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
        <header className="flex-between mb-8">
          <div className="flex">
            <NavProfileInfo />
          </div>
          <SheetClose>
            <X className="text-white-100" />
          </SheetClose>
        </header>
        <div className="mb-6">
          <CreateOrSearchForPost />
        </div>
        <div className="mb-6 border-y-[0.68px] border-white-500 py-6">
          <QuickLinks />
        </div>
        <PostsList />
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
