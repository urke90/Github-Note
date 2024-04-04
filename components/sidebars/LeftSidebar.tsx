import Image from 'next/image';
import PostsList from '../navigation/NavPostsList';
import QuickLinks from '../navigation/QuickLinks';

// ----------------------------------------------------------------

type Props = {};

const LeftSidebar = (props: Props) => {
  return (
    <aside className="flex max-w-[290px] flex-col border-r border-r-[#4448691A] bg-black-800 px-7 max-md:hidden">
      <Image
        src="/assets/images/Logo.svg"
        alt="Github Note"
        width={102}
        height={24}
        className="mb-12 mt-10"
      />
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
