import Image from 'next/image';
import PostsList from '../navigation/NavPostsList';
import QuickLinks from '../navigation/QuickLinks';
import CreateOrSearchForPost from '../post/CreateOrSearchForPost';
import Link from 'next/link';

// ----------------------------------------------------------------

const LeftSidebar = () => {
  return (
    <aside className="flex min-h-screen w-full max-w-[290px] flex-col border-r-[1.5px] border-r-[#4448691A] bg-black-800 px-7 max-md:hidden">
      <Link href="/">
        <Image
          src="/assets/images/Logo.svg"
          alt="Github Note"
          width={102}
          height={24}
          className="mb-12 mt-10"
        />
      </Link>
      <div className="mb-6">
        <CreateOrSearchForPost />
      </div>
      <div className="border-y-[0.68px] border-white-500 py-6">
        <PostsList />
      </div>
      <div className="pt-6">
        <QuickLinks />
      </div>
    </aside>
  );
};

export default LeftSidebar;
