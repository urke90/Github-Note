import { EOnboardingStep } from './onboarding-step';

import { ILearningGoals } from '@/models/user';

// ----------------------------------------------------------------

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  avatarImg?: string;
  portfolioUrl: string;
  learningGoals?: ILearningGoals[];
  knowledgeLevel?: string[];
  techStack: string;
  isAvailable: boolean;
  startDate: string | undefined;
  endDate: string | undefined;
  onboardingStep: EOnboardingStep;
  createdAt: string;
  updatedAt: string;
}
