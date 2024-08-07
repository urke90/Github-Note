import { EOnboardingStep } from './onboarding-step';

// ----------------------------------------------------------------

interface ILearningGoals {
  _id: string;
  isChecked: boolean;
  goal: string;
}
export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  avatarImg: string;
  portfolioUrl: string;
  learningGoals?: ILearningGoals[];
  knowledgeLevel?: string[];
  techStack: string[];
  isAvailable: boolean;
  startDate: string | undefined;
  endDate: string | undefined;
  onboardingStep: EOnboardingStep;
  createdAt: string;
  updatedAt: string;
  githubName?: string;
  githubLink?: string;
  linkedinName?: string;
  linkedinLink?: string;
  twitterName?: string;
  twitterLink?: string;
  instagramName?: string;
  instagramLink?: string;
  facebookName?: string;
  facebookLink?: string;
  dribbbleName?: string;
  dribbbleLink?: string;
}
