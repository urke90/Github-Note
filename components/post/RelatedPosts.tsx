import Image from 'next/image';
import { Button } from '../ui/button';

interface IRelatedPostsProps {}

/**
 * TODO  Check later if list item have onClick handler and what would the flow be????
 */

const RelatedPosts = (props: IRelatedPostsProps) => {
  return (
    <div>
      <p className="p2-bold mb-4 text-white-100">Related Posts</p>
      <ul className="flex flex-col gap-4 border-t-[0.68px] border-white-500 py-4">
        <li>Bottom Icons</li>
        <li>Popup</li>
        <li>Slider Sheet</li>
        <li>Tab bar</li>
      </ul>
      <Button variant="secondary" className="gap-2">
        <Image
          src="/assets/icons/Plus-primary-blue.svg"
          width={14}
          height={14}
          alt="Plus"
        />
        <span className="p3-medium">New related post</span>
      </Button>
    </div>
  );
};

export default RelatedPosts;
