import { NextResponse } from 'next/server';

import { auth } from '@/auth';

export const GET = async () => {
  const session = await auth();
  return NextResponse.json({ ok: true, user: session?.user });
};
