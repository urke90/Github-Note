'use client';

import AddLearningGoalItem from '../shared/AddLearningGoalItem';
import { Button } from '../ui/button';

import Image from 'next/image';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { IUserOnboarding } from '@/lib/zod/user-schema';
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
    <article className="flex flex-col gap-2">
      <p className="p3-medium">Learning goals</p>
      <ul className="mb-1.5 flex flex-col gap-2">
        {fields?.length > 0 ? (
          fields.map((field, index) => (
            <AddLearningGoalItem
              key={field.id}
              index={index}
              onRemove={remove}
            />
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
        className="mb-4"
      >
        <Image
          src="/assets/icons/plus-primary-blue.svg"
          alt="add"
          width={14}
          height={14}
        />
        Add goal checkbox
      </Button>
      <Button type="button" onClick={validateAndChangeStep}>
        Next
      </Button>
    </article>
  );
};

export default LearningGoals;
