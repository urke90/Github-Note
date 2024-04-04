'use client';

// ----------------------------------------------------------------

interface ITagItemProps {
  title: string;
  onClick?: () => void;
}

const TagItem: React.FC<ITagItemProps> = ({ title, onClick }) => {
  return (
    <li
      onClick={() => onClick?.()}
      className="p3-medium flex rounded-[3px] bg-black-700 px-2 py-0.5 text-center"
    >
      {title}
    </li>
  );
};

export default TagItem;
