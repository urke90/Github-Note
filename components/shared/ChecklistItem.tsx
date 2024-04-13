import Image from 'next/image';

// ----------------------------------------------------------------

interface IChecklistItemProps {
  title: string;
}

const ChecklistItem: React.FC<IChecklistItemProps> = ({ title }) => {
  return (
    <li className="flex gap-1.5">
      <Image
        src="/assets/icons/icn-check-square-green.svg"
        width={20}
        height={20}
        alt="Check"
      />
      <span className="p2-regular">{title}</span>
    </li>
  );
};

export default ChecklistItem;
