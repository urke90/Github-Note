import { useFieldArray, useFormContext } from 'react-hook-form';
import { X } from 'lucide-react';
import Image from 'next/image';
import RHFInput from '../RHFInputs/RHFInput';
import { Button } from '../ui/button';
import { EPostType } from '@/types/post-types';

// ----------------------------------------------------------------

/**
 * post type can be 'KNOWLEDGE' or 'WORKFLOW' only since Checklist doesn't exist for type 'COMPONENT'
 */
const { KNOWLEDGDE } = EPostType;

interface IChecklistProps {
  postType: EPostType.KNOWLEDGDE | EPostType.WORKFLOW;
}

const Checklist: React.FC<IChecklistProps> = ({ postType }) => {
  const {
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'checklist',
  });

  const noContentMessage =
    postType === KNOWLEDGDE
      ? 'Start adding what you have learned...'
      : 'Add steps to follow...';

  return (
    <div>
      <p className="mb-2 text-sm">
        {postType === KNOWLEDGDE ? 'What you learned' : 'Steps to follow'}
      </p>
      <ul className="mb-3.5">
        {fields.length ? (
          fields.map((field, index) => {
            return (
              <li
                key={field.id}
                className="flex-between my-1 rounded bg-black-700 px-3 "
              >
                <div className="flex flex-1 items-center">
                  <Image
                    src="/assets/icons/icn-check-square.svg"
                    alt="Checked"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <RHFInput
                    name={`checklist.${index}`}
                    placeholder="Enter your expertise level"
                    className="pl-0"
                  />
                </div>
                <X
                  className="size-[20px] cursor-pointer text-white-500"
                  onClick={() => remove(index)}
                />
              </li>
            );
          })
        ) : (
          <li className="my-2 rounded  px-3 py-2 text-center">
            {errors.checklist
              ? errors.checklist.message?.toString()
              : noContentMessage}
          </li>
        )}
      </ul>
      <Button
        onClick={() => append('')}
        variant="secondary"
        type="button"
        className="gap-2"
      >
        <Image src="/assets/icons/plus.svg" width={16} height={16} alt="Add" />
        <span className="text-xs text-white-100">Add checkmark</span>
      </Button>
    </div>
  );
};

export default Checklist;
