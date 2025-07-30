'use client';

import { UserRound } from 'lucide-react';
import { Button } from './ui/button';

export function SignInButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => console.log('Login clicked')}
      className="hidden sm:flex"
    >
      <UserRound className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  );
}
