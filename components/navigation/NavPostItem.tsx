import Image from 'next/image';
import { EPostType } from '@/types/post-types';

// ----------------------------------------------------------------

interface INavPostItemProps {
  type: EPostType;
  postText: string;
}

const NavPostItem: React.FC<INavPostItemProps> = ({ type, postText }) => {
  const { COMPONENT, KNOWLEDGDE, WORKFLOW } = EPostType;
  const getImageSrc = (postType: EPostType) => {
    switch (postType) {
      case COMPONENT:
        return '/assets/images/icn-computer.svg';
      case KNOWLEDGDE:
        return '/assets/images/icn-message-circle.svg';
      case WORKFLOW:
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
