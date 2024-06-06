import TagItem from './TagItem';

import type { ITag } from '@/types/tag';

// ----------------------------------------------------------------

interface IRecentTagsListProps {
  tags: ITag[];
}

const RecentTagsList: React.FC<IRecentTagsListProps> = ({ tags }) => {
  return (
    <>
      <p className="p3-bold mb-4">Tags</p>
      <ul className="flex flex-col gap-3">
        {tags?.length > 0 ? (
          tags.map(({ _id, ownerId, title }) => (
            <TagItem key={_id} isFilterItem title={title} />
          ))
        ) : (
          <li>No tags to display...</li>
        )}
        {/* <TagItem isAnimated title="Authentication" />
        <TagItem isAnimated title="Next.js" />
        <TagItem isAnimated title="Next.js setup" />
        <TagItem isAnimated title="ESLint/Prettier" />
        <TagItem isAnimated title="Header" />
        <TagItem isAnimated title="Clerk" /> */}
      </ul>
    </>
  );
};

export default RecentTagsList;
