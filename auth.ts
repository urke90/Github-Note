import { createNewUser, getUserByEmail } from './lib/actions/user-actions';

import NextAuth from 'next-auth';

import authConfig from '@/auth.config';

// ----------------------------------------------------------------

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') return true;

      try {
        if (!user.email) return false;
        const existingUser = await getUserByEmail(user.email);

        if (existingUser) return true;

        await createNewUser({
          fullName: user.name ?? '',
          email: user.email,
          password: '',
          avatarImg: user.image ?? '',
        });

        return true;
      } catch (error) {
        console.log('Error with sign in with provider', error);
        return false;
      }
    },
    async jwt({ token }) {
      try {
        if (!token.email) return token;

        const fetchedUser = await getUserByEmail(token.email);
        if (fetchedUser) {
          token.id = fetchedUser._id.toString();
          token.onboardingStep = fetchedUser.onboardingStep;
          token.picture = fetchedUser.avatarImg;
        }

        return token;
      } catch (error) {
        console.log('Error inside jwt callback', error);
      }

      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.onboardingStep = token.onboardingStep;
        session.user.image = token.picture;
      }

      return session;
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
  },
  pages: {
    signIn: '/login',
  },
  ...authConfig,
});
