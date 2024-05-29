import { EPostType } from '@/types/post-types';

// ----------------------------------------------------------------

/**
 * Used to create options in the select(dropdown) for type of the post user is creating. Values: 'COMPONENT' | 'KNOWLEDGDE' | 'WORKFLOW'
 */
export const POST_TYPES = [
  {
    value: EPostType.COMPONENT,
    imgUrl: '/assets/icons/icn-computer.svg',
    label: 'Component',
  },
  {
    value: EPostType.KNOWLEDGDE,
    imgUrl: '/assets/icons/icn-message-circle.svg',
    label: 'Knowledge',
  },
  {
    value: EPostType.WORKFLOW,
    imgUrl: '/assets/icons/icn-list-number.svg',
    label: 'WorkFlow',
  },
];
