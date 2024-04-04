import React from 'react';
import TagItem from './TagItem';

type Props = {};

const TagsList = (props: Props) => {
  return (
    <>
      <p className="p3-bold mb-4">Tags</p>
      <ul className="flex flex-col gap-3">
        <TagItem title="Authentication" />
        <TagItem title="Next.js" />
        <TagItem title="Next.js setup" />
        <TagItem title="ESLint/Prettier" />
        <TagItem title="Header" />
        <TagItem title="Clerk" />
      </ul>
    </>
  );
};

export default TagsList;
