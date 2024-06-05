'use client';

import RHFCheckbox from '../RHFInputs/RHFCheckbox';
import RHFInput from '../RHFInputs/RHFInput';
import CloseIcon from '../icons/CloseIcon';
import { Button } from '../ui/button';

import Image from 'next/image';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { IUserOnboarding } from '@/lib/zod/onboarding-schema';
import { EOnboardingStep } from '@/types/onboarding-step';

// ----------------------------------------------------------------

interface ILearningGoalsProps {
  handleChangeStep: (
    // eslint-disable-next-line no-unused-vars
    data: Partial<IUserOnboarding>,
    // eslint-disable-next-line no-unused-vars
    newStep: EOnboardingStep
  ) => void;
}

const LearningGoals: React.FC<ILearningGoalsProps> = ({ handleChangeStep }) => {
  const {
    trigger,
    formState: { errors },
    getValues,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: 'learningGoals' });
  const validateAndChangeStep = async () => {
    const validInputs = await trigger('learningGoals');

    if (!validInputs) return;

    const learningGoals = getValues('learningGoals');

    await handleChangeStep(
      { learningGoals, onboardingStep: EOnboardingStep.KNOWLEDGE_LEVEL },
      EOnboardingStep.KNOWLEDGE_LEVEL
    );
  };

  return (
    <div>
      <p className="p3-medium">Learning goals</p>
      <div className="mb-6">
        <ul>
          {fields?.length > 0 ? (
            fields.map((field, index) => (
              <li
                key={field.id}
                className="flex-between my-2 rounded  bg-black-700 px-3 py-1"
              >
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
                  onClick={() => remove(index)}
                />
              </li>
            ))
          ) : (
            <li
              className={`my-2 rounded  px-3 py-2 text-center ${errors.learningGoals ? 'text-red-regular' : ''}`}
            >
              {errors.learningGoals
                ? errors.learningGoals?.message?.toString()
                : 'Add your learning goals...'}
            </li>
          )}
        </ul>
        <Button
          type="button"
          onClick={() => append({ isChecked: false, goal: '' })}
          variant="secondary"
          className={`${fields.length === 0 ? 'mt-2' : ''}`}
        >
          <Image
            src="/assets/icons/plus-primary-blue.svg"
            alt="add"
            width={14}
            height={14}
          />
          Add goal checkbox
        </Button>
      </div>
      <Button type="button" onClick={validateAndChangeStep}>
        Next
      </Button>
    </div>
  );
};

export default LearningGoals;
