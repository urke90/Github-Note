'use client';

import { useRef } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
// components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// ----------------------------------------------------------------

const Login = () => {
  const email = useRef('');
  const password = useRef('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn('signin', {
      email: email.current,
      password: password.current,
    });

    // console.log('result u signinu', result);
  };

  return (
    <div className="h-screen">
      <div className="m-auto mt-16 flex w-[382px] flex-col">
        <div className="mb-24 flex justify-center">
          <Image
            src="/assets/images/Logo.svg"
            alt="Logo"
            width={164}
            height={41}
          />
        </div>
        <div className="mb-5">
          <h2 className="h2-bold text-white-100">Login</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className="p3-medium">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-6 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password" className="p3-medium">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <Button type="submit">Login</Button>
          </div>
        </form>
        <Link
          href="/sign-up"
          className="mb-6 text-center text-sm text-white-300 underline"
        >
          I don&apos;t have an account
        </Link>
        <p className="p4-regular mb-6 text-center">or</p>
        <Button
          variant="secondary"
          className="mb-4 text-white-300"
          onClick={() => signIn('google')}
        >
          <Image
            src="/assets/images/google.png"
            alt="Google"
            width={16}
            height={16}
          />
          Continue with Google
        </Button>
        <Button
          variant="secondary"
          className="text-sm text-white-300"
          onClick={() => signIn('github')}
        >
          <Image
            src="/assets/images/github.png"
            alt="Google"
            width={16}
            height={16}
          />
          Continue with GitHub
        </Button>
      </div>
    </div>
  );
};

export default Login;
