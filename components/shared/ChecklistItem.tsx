import Image from 'next/image';

// ----------------------------------------------------------------

interface IChecklistItemProps {
  title: string;
  isBlueIcon?: boolean;
}

const ChecklistItem: React.FC<IChecklistItemProps> = ({
  title,
  isBlueIcon = false,
}) => {
  const imgSrc = `/assets/icons/${isBlueIcon ? 'icn-check-square.svg' : 'icn-check-square-green.svg'}`;
  return (
    <li className="flex gap-1.5">
      <Image src={imgSrc} width={20} height={20} alt="Check" />
      <span className="p2-regular">{title}</span>
    </li>
  );
};

export default ChecklistItem;
