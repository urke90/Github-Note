import Image from 'next/image';
import type { TPostType } from '@/types/Posts';

// ----------------------------------------------------------------

interface INavPostItemProps {
  type: TPostType;
  postText: string;
}

const NavPostItem: React.FC<INavPostItemProps> = ({ type, postText }) => {
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
    <li className="mb-5 flex last:mb-0">
      <Image
        src={imageSrc}
        width={16}
        height={16}
        alt={postText}
        className="mr-3"
      />
      <span className="p3-medium transition-colors  hover:text-primary-500">
        {postText}
      </span>
    </li>
  );
};

export default NavPostItem;
