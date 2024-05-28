import { Suspense } from 'react';

import { auth } from '@/auth';
import { getUserById } from '@/lib/actions/user-actions';
import OnboardingContainer from '@/components/onboarding/OnboardingContainer';
import type { IUser } from '@/models/User';

// ----------------------------------------------------------------

const Onboarding = async () => {
  const session = await auth();
  if (!session?.user.id) return null;

  const user: IUser | null = await getUserById(session.user.id);

  if (!user) {
    return null;
  }

  return (
    <Suspense fallback="Loading...">
      <OnboardingContainer user={user} />
    </Suspense>
  );
};

export default Onboarding;
