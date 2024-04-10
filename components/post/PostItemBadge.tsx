import Image from 'next/image';
import { EPostType } from '@/types/post-types';

// ----------------------------------------------------------------

interface IPostItemBadgeProps {
  postType: EPostType;
}

const PostItemBadge: React.FC<IPostItemBadgeProps> = ({ postType }) => {
  const { COMPONENT, WORKFLOW, KNOWLEDGDE } = EPostType;

  let styles = '';
  let imgUrl = '';
  let label = '';

  const generateBadge = (postType: EPostType) => {
    switch (postType) {
      case COMPONENT:
        styles = 'text-purple-500 bg-[#42BBFF1A]';
        imgUrl = '/assets/icons/icn-computer.svg';
        label = 'Component';

        break;
      case KNOWLEDGDE:
        styles = 'text-green-500 bg-[#42FF771A]';
        imgUrl = '/assets/icons/icn-message-circle.svg';
        label = 'Knowledge';
        break;
      case WORKFLOW:
        styles = 'text-primary-500  bg-[#9542FF1A]';
        imgUrl = '/assets/icons/icn-list-number.svg';
        label = 'WorkFlow';
        break;
      default:
        styles = 'text-purple-500 bg-[#42BBFF1A]';
        imgUrl = '/assets/icons/icn-computer.svg';
        label = 'Component';
    }
  };

  generateBadge(postType);

  return (
    <div
      className={`${styles} flex gap-1 rounded-[3px] py-0.5 pl-1 pr-2 text-sm`}
    >
      <Image src={imgUrl} alt={label} width={16} height={16} />
      {label}
    </div>
  );
};

export default PostItemBadge;
