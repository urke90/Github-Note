import { Document, Model, model, models, Schema } from 'mongoose';

import { EOnboardingStep } from '@/types/onboarding-step';

export interface ILearningGoals extends Document {
  isChecked: boolean;
  goal: string;
}

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  avatarImg?: string;
  portfolioUrl: string;
  learningGoals?: ILearningGoals[];
  knowledgeLevel?: string[];
  techStack: string;
  isAvailable: boolean;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onboardingStep: EOnboardingStep;
}

const LearningGoalsSchema = new Schema<ILearningGoals>({
  isChecked: { type: Boolean, required: true },
  goal: { type: String, required: true },
});

const UserSchema: Schema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, 'Please enter a full name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email address!'],
    unique: true,
  },
  password: String,
  avatarImg: String,
  portfolioUrl: String,
  learningGoals: [LearningGoalsSchema],
  knowledgeLevel: [String],
  techStack: [String],
  isAvailable: Boolean,
  startDate: Date,
  endDate: Date,
  onboardingStep: Number,
});

const User: Model<IUser> = models?.User || model<IUser>('User', UserSchema);

export default User;
