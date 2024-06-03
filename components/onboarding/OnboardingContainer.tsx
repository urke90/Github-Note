'use client';

import { useToast } from '../ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import BasicInformation from '@/components/onboarding/BasicInformations';
import KnowledgeLevel from '@/components/onboarding/KnowledgeLevel';
import LearningGoals from '@/components/onboarding/LearningGoals';
import ScheduleAndAvailability from '@/components/onboarding/ScheduleAndAvailability';
import Stepper from '@/components/shared/Stepper';
import { Form } from '@/components/ui/form';
import {
  updateUser,
  updateUserOnboardingStep,
} from '@/lib/actions/user-actions';
import type { IUserOnboarding } from '@/lib/zod/onboarding-schema';
import { onboardingSchema } from '@/lib/zod/onboarding-schema';
import { IUser } from '@/models/User';
import { EOnboardingStep } from '@/types/onboarding-step';

// ----------------------------------------------------------------

const generateTitleBasedOnStep = (step: EOnboardingStep) => {
  switch (step) {
    case EOnboardingStep.BASIC_INFORMATION:
      return 'Basic Information';
    case EOnboardingStep.LEARNING_GOALS:
      return 'Add your learning goals';
    case EOnboardingStep.KNOWLEDGE_LEVEL:
      return 'Add your knowledge level';
    case EOnboardingStep.SCHEDULE_AND_AVAILABILITY:
      return 'Schedule & availability';
    default:
      return 'Basic Information';
  }
};

interface IOnboardingContainer {
  user: IUser;
}

const OnboardingContainer: React.FC<IOnboardingContainer> = ({ user }) => {
  const { toast } = useToast();
  const {
    fullName,
    portfolioUrl,
    avatarImg,
    learningGoals,
    knowledgeLevel,
    techStack,
    startDate,
    endDate,
    projectAvailability,
    onboardingStep,
    _id,
  } = user || {};
  const router = useRouter();
  const [step, setStep] = useState<EOnboardingStep>(
    onboardingStep || EOnboardingStep.BASIC_INFORMATION
  );

  const onboardingForm = useForm<IUserOnboarding>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: fullName || '',
      portfolioUrl: portfolioUrl || '',
      avatarImg: avatarImg || '',
      learningGoals: learningGoals || [],
      knowledgeLevel: knowledgeLevel || [],
      techStack: techStack || '',
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      projectAvailability: projectAvailability || false,
      onboardingStep: onboardingStep || step,
    },
  });

  const handleChangeStep = async (
    data: Partial<IUserOnboarding>,
    newStep: EOnboardingStep
  ) => {
    if (!_id) return;

    await updateUserOnboardingStep(user._id.toString(), data);
    setStep(newStep);
  };

  const onSubmit: SubmitHandler<IUserOnboarding> = async (data) => {
    data.onboardingStep = EOnboardingStep.FINISHED_ONBOARDING;

    try {
      if (!_id) return;
      const response = await updateUser(_id, data);
      if (response?.ok && response?.status === 200) {
        toast({
          variant: 'success',
          title: 'Onboarding finished successfully!',
        });
        router.push('/');
      }
    } catch (error) {
      console.log('Error in submit onboarding user info', error);
    }
  };

  return (
    <section className="mt-[30px] px-5">
      <div className="m-auto max-w-[600px]">
        <Image
          src="/assets/images/Logo.svg"
          alt="Logo"
          width={156}
          height={36}
          className="m-auto my-16"
        />
        <div className="m-auto rounded-xl bg-black-800 px-5 py-8 sm:px-8">
          <div className="mb-6">
            <Stepper currentStep={step} />
          </div>
          <h2 className="h2-bold mb-6">{generateTitleBasedOnStep(step)}</h2>
          <article>
            <Form {...onboardingForm}>
              <form onSubmit={onboardingForm.handleSubmit(onSubmit)}>
                {step === EOnboardingStep.BASIC_INFORMATION && (
                  <BasicInformation handleChangeStep={handleChangeStep} />
                )}
                {step === EOnboardingStep.LEARNING_GOALS && (
                  <LearningGoals handleChangeStep={handleChangeStep} />
                )}
                {step === EOnboardingStep.KNOWLEDGE_LEVEL && (
                  <KnowledgeLevel handleChangeStep={handleChangeStep} />
                )}
                {step === EOnboardingStep.SCHEDULE_AND_AVAILABILITY && (
                  <ScheduleAndAvailability />
                )}
              </form>
            </Form>
          </article>
        </div>
      </div>
    </section>
  );
};

export default OnboardingContainer;
