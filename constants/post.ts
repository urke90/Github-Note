import { EPostType } from '@/types/post-types';

const { COMPONENT, KNOWLEDGDE, WORKFLOW } = EPostType;

/**
 * Used to create options in the select(dropdown) for type of the post user is creating. Values: 'COMPONENT' | 'KNOWLEDGDE' | 'WORKFLOW'
 */
export const POST_TYPE = [
  {
    value: COMPONENT,
    imgUrl: '/assets/icons/icn-computer.svg',
    label: 'Component',
  },
  {
    value: KNOWLEDGDE,
    imgUrl: '/assets/icons/icn-message-circle.svg',
    label: 'Knowledge',
  },
  {
    value: WORKFLOW,
    imgUrl: '/assets/icons/icn-list-number.svg',
    label: 'Workflow',
  },
];
