import { EPostType } from '@/types/post-types';

// ----------------------------------------------------------------

export const AVAILABLE_TECH_STACK_ICONS = [
  'aws',
  'bitbucket',
  'chakraui',
  'css',
  'eslint',
  'gitlab',
  'html',
  'javabe',
  'javascript',
  'materialui',
  'mongodb',
  'mysql',
  'next',
  'node',
  'postgresql',
  'prisma',
  'react',
  'redux',
  'scss',
  'tailwind',
  'three',
  'typescript',
  'vite',
  'vscode',
];

export const CLOUDINARY_URL =
  'https://res.cloudinary.com/git-note/image/upload';

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
    value: EPostType.KNOWLEDGE,
    imgUrl: '/assets/icons/icn-message-circle.svg',
    label: 'Knowledge',
  },
  {
    value: EPostType.WORKFLOW,
    imgUrl: '/assets/icons/icn-list-number.svg',
    label: 'WorkFlow',
  },
];
