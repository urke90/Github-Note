'use client';

import RHFInput from '../RHFInputs/RHFInput';
import AddKnowledgeLevelItem from '../shared/AddKnowledgeLevelItem';
import { Button } from '../ui/button';

import Image from 'next/image';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { IUserOnboarding } from '@/lib/zod/user-schema';
import { EOnboardingStep } from '@/types/onboarding-step';

// ----------------------------------------------------------------

interface IKnowledgeLevelProps {
  handleChangeStep: (
    // eslint-disable-next-line no-unused-vars
    data: Partial<IUserOnboarding>,
    // eslint-disable-next-line no-unused-vars
    newStep: EOnboardingStep
  ) => void;
}

const KnowledgeLevel: React.FC<IKnowledgeLevelProps> = ({
  handleChangeStep,
}) => {
  const {
    trigger,
    formState: { errors },
    getValues,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: 'knowledgeLevel' });

  const validateAndChangeStep = async () => {
    const validInputs = await trigger('knowledgeLevel');

    if (!validInputs) return;

    const knowledgeLevel = getValues('knowledgeLevel');

    handleChangeStep(
      {
        knowledgeLevel,
        onboardingStep: EOnboardingStep.SCHEDULE_AND_AVAILABILITY,
      },
      EOnboardingStep.SCHEDULE_AND_AVAILABILITY
    );
  };

  return (
    <article className="flex flex-col gap-2">
      <p className="p3-medium">Knowledgde Level</p>
      <ul className="mb-1.5 flex flex-col gap-2">
        {fields.length > 0 ? (
          fields.map((field, index) => (
            <AddKnowledgeLevelItem
              key={field.id}
              index={index}
              onRemove={remove}
            />
          ))
        ) : (
          <li
            className={`my-2 rounded border px-3 text-center ${errors.knowledgeLevel ? 'text-red-regular' : ''}`}
          >
            {errors.knowledgeLevel
              ? errors.knowledgeLevel.message?.toString()
              : 'Start adding your expertise...'}
          </li>
        )}
      </ul>
      <Button
        type="button"
        onClick={() => append('')}
        variant="secondary"
        className="mb-2"
      >
        <Image
          src="/assets/icons/plus-primary-blue.svg"
          width={14}
          height={14}
          alt="Add"
        />
        Add knowledge checkmark
      </Button>
      <RHFInput
        name="techStack"
        label="Tech Stack"
        placeholder="Please add your Tech Stack..."
      />
      <Button type="button" onClick={validateAndChangeStep} className="mt-4">
        Next
      </Button>
    </article>
  );
};

export default KnowledgeLevel;
