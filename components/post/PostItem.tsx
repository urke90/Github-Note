import Image from 'next/image';
import type { TPostType } from '@/types/Posts';

// ----------------------------------------------------------------

interface IPostItemProps {
  type: TPostType;
  postText: string;
}

const PostItem: React.FC<IPostItemProps> = ({ type, postText }) => {
  const getImageSrc = (postType: TPostType) => {
    switch (postType) {
      case 'component':
        return '/assets/images/icn-computer.svg';
      case 'knowledge':
        return '/assets/images/icn-message-circle.svg';
      case 'workflow':
        return '/assets/images/icn-list-number.svg';
      default:
        return '/assets/images/icn-computer.svg';
    }
  };

  const imageSrc = getImageSrc(type);

  return (
    <li className="mb-5 flex">
      <Image
        src={imageSrc}
        width={16}
        height={16}
        alt={postText}
        className="mr-3"
      />
      <span className="transition-colors hover:text-primary-500">
        {postText}
      </span>
    </li>
  );
};

export default PostItem;
