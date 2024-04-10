'use client';

import { EPostType } from '@/types/post-types';
import PostItemBadge from './PostItemBadge';
import TagItem from '../tag/TagItem';
import type { ITag } from '@/types/Tag';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------

interface IPostItemProps {
  postType: EPostType;
  title: string;
  postId: string;
  tags: ITag[];
}

const PostItem: React.FC<IPostItemProps> = ({
  title,
  postType,
  tags,
  postId,
}) => {
  const router = useRouter();
  return (
    <li
      className="max-h-[182px] cursor-pointer rounded-lg bg-black-800 px-9 py-6"
      onClick={() => router.push('/post/' + postId)}
    >
      <PostItemBadge postType={postType} />
      <h1 className="h1-medium my-4 line-clamp-2 text-white-100">{title}</h1>
      <ul className="flex gap-2.5">
        {tags.length
          ? tags.map((tag) => <TagItem key={tag.title} title={tag.title} />)
          : null}
      </ul>
    </li>
  );
};

export default PostItem;
