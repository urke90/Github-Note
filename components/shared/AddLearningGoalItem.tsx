import RHFCheckbox from '../RHFInputs/RHFCheckbox';
import RHFInput from '../RHFInputs/RHFInput';
import CloseIcon from '../icons/CloseIcon';

// ----------------------------------------------------------------

interface IAddLearningGoalItemProps {
  index: number;
  onRemove: (index: number) => void;
}

const AddLearningGoalItem: React.FC<IAddLearningGoalItemProps> = ({
  index,
  onRemove,
}) => {
  return (
    <li className="flex-between rounded bg-black-700 px-3">
      <div className="flex flex-1 items-center">
        <RHFCheckbox
          name={`learningGoals.${index}.isChecked`}
          className="mr-0 pr-0"
        />
        <RHFInput
          name={`learningGoals.${index}.goal`}
          placeholder="Enter a learning goal"
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

export default AddLearningGoalItem;
