'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

// ----------------------------------------------------------------

interface ITagItemProps {
  title: string;
  isLink?: boolean;
}

const TagItem: React.FC<ITagItemProps> = ({ title, isLink = true }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleUpdateTagParam = (tagName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.has('tag', tagName)) {
      params.delete('tag', tagName);
    } else {
      params.append('tag', tagName);
    }

    return params.toString();
  };

  return (
    <li className="p3-medium inline-block w-fit cursor-pointer rounded-[3px] bg-black-700 px-2 py-0.5 text-center">
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
