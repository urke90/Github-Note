import PostsList from './NavPostsList';
import QuickLinks from './QuickLinks';

import CloseIcon from '../icons/CloseIcon';
import CreateOrSearchForPost from '../post/CreateOrSearchForPost';
import NavProfileInfo from '../shared/NavProfileInfo';

import Image from 'next/image';

import {
  Sheet,
  SheetClose,
  SheetContent,
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
        <header className="flex-between mb-8">
          <div className="flex">
            <NavProfileInfo />
          </div>
          <SheetClose>
            <CloseIcon width={24} height={24} />
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
