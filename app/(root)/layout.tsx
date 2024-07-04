import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import MobileNav from '@/components/navigation/MobileNav';
import RecentTagsList from '@/components/shared/RecentTagsList';
import { getRecentTags } from '@/lib/actions/tag-actions';
import type { ITag } from '@/types/tag';

// ----------------------------------------------------------------

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const recentTags: ITag[] = await getRecentTags();

  return (
    <div className="mx-auto flex h-full max-w-[1440px]">
      <LeftSidebar />
      <div className="flex flex-1 flex-col">
        <div className="mb-[30px] md:hidden">
          <MobileNav />
        </div>
        {children}
      </div>
      <RightSidebar>
        <RecentTagsList tags={recentTags} />
      </RightSidebar>
    </div>
  );
};

export default Layout;
