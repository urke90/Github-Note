'use client';

import RHFInput from '../RHFInputs/RHFInput';
import { Button } from '../ui/button';

import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { IUserOnboarding } from '@/lib/zod/onboarding-schema';
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
    <div>
      <p className="p3-medium">Knowledgde Level</p>
      <div className="mb-6">
        <ul>
          {fields.length > 0 ? (
            fields.map((field, index) => (
              <li
                key={field.id}
                className="flex-between my-2 rounded bg-black-700 px-3 py-1"
              >
                <div className="flex flex-1 items-center ">
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
                <X
                  className="cursor-pointer text-white-500"
                  onClick={() => remove(index)}
                />
              </li>
            ))
          ) : (
            <li
              className={`my-2 rounded  px-3 py-2 text-center ${errors.knowledgeLevel ? 'text-red-regular' : ''}`}
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
          className={`${fields.length === 0 ? 'mt-3' : ''} mb-6`}
        >
          <Plus className="size-[16px] rounded bg-primary-500 text-black-600" />
          Add knowledge checkmark
        </Button>
        <RHFInput
          name="techStack"
          label="Tech Stack"
          placeholder="Please add your Tech Stack..."
        />
      </div>
      <Button type="button" onClick={validateAndChangeStep}>
        Next
      </Button>
    </div>
  );
};

export default KnowledgeLevel;
