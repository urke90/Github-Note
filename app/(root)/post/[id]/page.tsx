import ComponentMenu from '@/components/shared/ComponentMenu';
import PostItemBadge from '@/components/post/PostItemBadge';
import { getPostById } from '@/lib/actions/post-actions';
import type { IPost } from '@/types/Post';
import Image from 'next/image';
import TagItem from '@/components/tag/TagItem';

// ----------------------------------------------------------------
interface IPostDetails {
  params: { id: string };
}

const PostDetails: React.FC<IPostDetails> = async ({ params }) => {
  const { id } = params;

  const post: IPost | undefined = await getPostById(id);
  console.log('post', post);

  if (!post)
    return <h1 className="h1-bold text-center">Could not find post!</h1>;

  const { title, type, description, tags } = post;

  console.log('tags', tags);

  return (
    <section>
      <div className="flex flex-col gap-5 border-b border-b-[#55597D1A] px-[30px] pb-8">
        <div className="lg:flex-between  flex gap-2.5 max-lg:flex-col">
          <h1 className="h1-bold line-clamp-2">{title}</h1>
          <div className="flex-between lg:flex-center ">
            <PostItemBadge postType={type} />
            <ComponentMenu />
          </div>
        </div>
        <p className="p3-regular ">{description}</p>
        <div className="flex gap-3.5">
          <div className="flex-center gap-1">
            <Image
              src="/assets/icons/icn-calendar.svg"
              width={14}
              height={14}
              alt="calender"
            />
            <span className="p3-regular">14 Feb 2024</span>
          </div>
          <div className="flex-center gap-1">
            <Image
              src="/assets/icons/icn-star.svg"
              width={14}
              height={14}
              alt="star"
            />
            <span className="p3-regular">10.2k stars</span>
          </div>
          <div className="flex-center gap-1">
            <Image
              src="/assets/icons/ri_eye-line.svg"
              width={14}
              height={14}
              alt="eye"
            />
            <span className="p3-regular">129k views</span>
          </div>
        </div>
        <ul className="flex gap-3">
          {tags.map(({ _id, title }) => (
            <TagItem key={_id} title={title} />
          ))}
        </ul>
      </div>
      <div></div>
    </section>
  );
};

export default PostDetails;
