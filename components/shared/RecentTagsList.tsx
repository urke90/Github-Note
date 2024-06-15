import TagItem from './TagItem';

import type { ITag } from '@/types/tag';

// ----------------------------------------------------------------

interface IRecentTagsListProps {
  tags: ITag[];
}

const RecentTagsList: React.FC<IRecentTagsListProps> = ({ tags }) => {
  return (
    <>
      {tags?.length > 0 && (
        <>
          <p className="p3-bold mb-4">Tags</p>
          <ul className="flex flex-col gap-3">
            {tags.map(({ _id, title }) => (
              <TagItem key={_id} isFilterItem title={title} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default RecentTagsList;
