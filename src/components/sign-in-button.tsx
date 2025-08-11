'use client';

import { UserRound } from 'lucide-react';
import { Button } from './ui/button';

export function SignInButton() {
  return (
    <Button
      className="hidden sm:flex"
      onClick={() => console.log('Login clicked')}
      size="sm"
      variant="outline"
    >
      <UserRound className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  );
}
