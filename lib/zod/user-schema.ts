import z from 'zod';

// ----------------------------------------------------------------

export const learningGoalsSchema = z.object({
  isChecked: z.boolean(),
  goal: z.string().trim().min(1, 'Please enter your goal!'),
});

export const userDataBaseSchema = z.object({
  fullName: z.string().min(3, 'Please enter your Name!'),
  portfolioUrl: z.union([z.string().url().nullish(), z.literal('')]),
  avatarImg: z.string().trim().optional(),
  learningGoals: z
    .array(learningGoalsSchema)
    .min(1, 'Please add at lease one goal!'),
  knowledgeLevel: z
    .array(z.string().min(3, 'Experise must contain at least 3 characters!'))
    .min(1, 'Please add your expertise level!'),
  techStack: z.string().trim(),
  isAvailable: z.boolean().optional(),
  startDate: z.date({ required_error: 'Plase enter start date!' }).optional(),
  endDate: z.date({ required_error: 'Please enter end date!' }).optional(),
});

export const updateUserSchema = userDataBaseSchema.extend({
  email: z.string().trim().email('Please provide a valid email address.'),
});

export type IUpdateUserSchema = z.infer<typeof updateUserSchema>;

// **************************************************** LOGIN AND ONBOARDING *******************************************************/

export const signUpFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: 'Full Name must be at least 3 characters long!' }),
  email: z.string().trim().email('Please enter valdi email address!'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long!'),
});

export type ISignUpFormData = z.infer<typeof signUpFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().trim().email('Please enter valid email address!'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long!'),
});

export type ILoginFormData = z.infer<typeof loginFormSchema>;

export const userOnboardingSchema = userDataBaseSchema.extend({
  onboardingStep: z.number().min(1).max(5),
});

export type IUserOnboarding = z.infer<typeof userOnboardingSchema>;

// **************************************************** LOGIN AND ONBOARDING *******************************************************/
