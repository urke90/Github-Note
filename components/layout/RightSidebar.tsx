import NavProfileInfo from '../shared/NavProfileInfo';
import RecentTagsList from '../shared/RecentTagsList';

import { getRecentTags } from '@/lib/actions/tag-actions';
import type { ITag } from '@/types/tag';

// ----------------------------------------------------------------

const RightSidebar: React.FC = async () => {
  const recentTags: ITag[] = await getRecentTags();

  return (
    <aside className="flex w-full max-w-[290px] flex-col border-l-[1.5px] border-l-[#4448691A] bg-black-800 px-7 py-10 max-xl:hidden">
      <div className="mb-12">
        <NavProfileInfo />
      </div>
      <RecentTagsList tags={recentTags} />
    </aside>
  );
};

export default RightSidebar;
