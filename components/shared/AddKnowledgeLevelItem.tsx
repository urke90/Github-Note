import RHFInput from '../RHFInputs/RHFInput';
import CloseIcon from '../icons/CloseIcon';

import Image from 'next/image';

// ----------------------------------------------------------------

interface IAddKnowledgeLevelItemProps {
  index: number;
  onRemove: (index: number) => void;
}

const AddKnowledgeLevelItem: React.FC<IAddKnowledgeLevelItemProps> = ({
  index,
  onRemove,
}) => {
  return (
    <li className="flex-between rounded bg-black-700 px-3">
      <div className="flex flex-1 items-center">
        <Image
          src="assets/images/icn-check-square.svg"
          alt="Checked"
          width={20}
          height={20}
          className="mr-2"
        />
        <RHFInput
          name={`knowledgeLevel.${index}`}
          placeholder="Enter your expertise level"
          className="pl-0"
        />
      </div>
      <CloseIcon
        className="cursor-pointer text-white-500"
        onClick={() => onRemove(index)}
      />
    </li>
  );
};

export default AddKnowledgeLevelItem;
