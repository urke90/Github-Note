import QuickLinks from './QuickLinks';

import CloseIcon from '../icons/CloseIcon';
import CreateOrSearchForPost from '../post/CreateOrSearchForPost';
import LinkPostItem from '../post/LinkPostItem';
import NavProfileInfo from '../shared/NavProfileInfo';

import Image from 'next/image';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getRecentPosts } from '@/lib/actions/post-actions';
import { IRecentPost } from '@/types/post';

// ----------------------------------------------------------------

const Navbar: React.FC = async () => {
  const recentPosts: IRecentPost[] | null = await getRecentPosts();

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
          <NavProfileInfo />
          <SheetClose>
            <CloseIcon width={24} height={24} />
          </SheetClose>
        </header>
        <div className="mb-6 flex flex-col gap-6">
          <CreateOrSearchForPost />
          {recentPosts && recentPosts?.length > 0 ? (
            <ul className="flex flex-col gap-5 border-y-[0.68px] border-white-500 py-6">
              {recentPosts?.map(({ _id, title, type }) => (
                <LinkPostItem key={_id} id={_id} title={title} type={type} />
              ))}
            </ul>
          ) : null}
          <QuickLinks />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
