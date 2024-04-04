'use client';

// ----------------------------------------------------------------

interface ITagItemProps {
  title: string;
  onClick?: () => void;
}

const TagItem: React.FC<ITagItemProps> = ({ title, onClick }) => {
  return (
    <li onClick={() => onClick?.()} className="flex">
      <span className="p3-medium rounded-[3px] bg-black-700 px-2 py-0.5 text-center">
        {title}
      </span>
    </li>
  );
};

export default TagItem;
