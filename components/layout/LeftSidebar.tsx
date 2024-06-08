import QuickLinks from '../navigation/QuickLinks';
import CreateOrSearchForPost from '../post/CreateOrSearchForPost';
import LinkPostItem from '../post/LinkPostItem';

import Image from 'next/image';
import Link from 'next/link';

import { getRecentPosts } from '@/lib/actions/post-actions';
import { IRecentPost } from '@/types/post';

// ----------------------------------------------------------------

const LeftSidebar = async () => {
  const recentPosts: IRecentPost[] | null = await getRecentPosts();

  return (
    <aside className="flex min-h-screen w-[290px] min-w-[290px] flex-col border-r-[1.5px] border-r-[#4448691A] bg-black-800 px-7 max-md:hidden">
      <Link href="/">
        <Image
          src="/assets/images/Logo.svg"
          alt="Github Note"
          width={102}
          height={24}
          className="mb-12 mt-10"
        />
      </Link>
      <div className="flex flex-col gap-6">
        <CreateOrSearchForPost />
        <div className="flex flex-col gap-5 border-y-[0.68px] border-white-500 py-6">
          <p className="subtitle-small">Posts</p>
          {recentPosts && recentPosts?.length > 0 ? (
            <ul className="flex flex-col gap-5 ">
              {recentPosts?.map(({ _id, title, type }) => (
                <LinkPostItem key={_id} id={_id} title={title} type={type} />
              ))}
            </ul>
          ) : null}
        </div>
        <QuickLinks />
      </div>
    </aside>
  );
};

export default LeftSidebar;
