import { Suspense } from 'react';

import { auth } from '@/auth';
import OnboardingContainer from '@/components/onboarding/OnboardingContainer';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { getUserById } from '@/lib/actions/user-actions';
import type { IUser } from '@/types/user';

// ----------------------------------------------------------------

const Onboarding = async () => {
  const session = await auth();
  if (!session?.user.id) return null;

  const user: IUser | null = await getUserById(session.user.id);

  if (!user) {
    return null;
  }

  return (
    <Suspense fallback={<LoadingSpinner asLayout />}>
      <OnboardingContainer user={user} />
    </Suspense>
  );
};

export default Onboarding;
