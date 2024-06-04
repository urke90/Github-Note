'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

// ----------------------------------------------------------------

interface ITagItemProps {
  title: string;
  isLink?: boolean;
}
// TODO still have to figure out UI for selected tags. Will i highlight them with color, show some list or anything else. Left isActive
const TagItem: React.FC<ITagItemProps> = ({ title, isLink = true }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let isActive = false;

  const handleUpdateTagParam = (tagName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.has('tag', tagName)) {
      isActive = false;
      params.delete('tag', tagName);
    } else {
      isActive = true;
      params.append('tag', tagName);
    }

    return params.toString();
  };

  console.log('isActive', isActive);

  return (
    <li
      // className="p3-medium inline-block w-fit cursor-pointer rounded-[3px] bg-black-700 px-2 py-0.5 text-center"
      className={`p3-medium inline-block w-fit cursor-pointer rounded-[3px] bg-black-700 px-2 py-0.5 text-center ${isActive ? 'text-green-500' : ''}`}
    >
      {isLink ? (
        <Link href={pathname + '?' + handleUpdateTagParam(title.toLowerCase())}>
          {title}
        </Link>
      ) : (
        title
      )}
    </li>
  );
};

export default TagItem;
