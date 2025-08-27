'use client';

import { UserRound } from 'lucide-react';
import { Button } from './ui/button';
import { loginAction } from '@/features/auth/actions/login.action';

export function SignInButton() {
  return (
    <Button className="hidden sm:flex" onClick={loginAction} size="sm" variant="outline">
      <UserRound className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  );
}
