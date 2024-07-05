import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import AUTH_CONFIG from '@/auth.config';
import {
  AUTH_ROUTES,
  HOME_ROUTE,
  LOGIN_ROUTE,
  ONBOARDING_ROUTE,
} from '@/routes';
import { EOnboardingStep } from '@/types/onboarding-step';

// ----------------------------------------------------------------

export const { auth } = NextAuth(AUTH_CONFIG);

export default auth(async (req) => {
  const currentRoute = req.nextUrl.pathname;

  const isAuthenticated = !!req.auth?.user;

  // routes
  const isAuthRoute = AUTH_ROUTES.includes(currentRoute);
  const isOnboardingRoute = currentRoute.startsWith(ONBOARDING_ROUTE);

  if (isAuthenticated) {
    const result = await fetch('http://localhost:3000/api/user', {
      headers: {
        Cookie: req.cookies.toString(),
      },
    });
    const resultJson = await result.json();

    const isOnboardingFinished =
      resultJson.user?.onboardingStep === EOnboardingStep.FINISHED_ONBOARDING;

    if (!isOnboardingFinished && !isOnboardingRoute) {
      return NextResponse.redirect(new URL(ONBOARDING_ROUTE, req.nextUrl));
    }
    if (isOnboardingFinished && isOnboardingRoute) {
      return NextResponse.redirect(new URL(HOME_ROUTE, req.nextUrl));
    }
    if (isAuthRoute) {
      return NextResponse.redirect(new URL(HOME_ROUTE, req.nextUrl));
    }
  }

  if (!isAuthenticated) {
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL(LOGIN_ROUTE, req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
};
