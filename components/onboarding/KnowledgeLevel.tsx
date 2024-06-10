'use client';

// import AddKnowledgeLevelItem from '../shared/AddKnowledgeLevel';
import AddKnowledgeLevel from '../shared/AddKnowledgeLevel';
import { Button } from '../ui/button';

import { useFormContext } from 'react-hook-form';

import type { IUserOnboarding } from '@/lib/zod/user-schema';
import { EOnboardingStep } from '@/types/onboarding-step';
import RHFInput from '../RHFInputs/RHFInput';

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
  const { trigger, getValues } = useFormContext();

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
      <AddKnowledgeLevel />
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
