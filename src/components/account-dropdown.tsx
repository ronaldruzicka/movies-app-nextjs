'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logoutAction } from '@/features/auth/actions/logout.action';
import { getProfileImage } from '@/lib/image-client/image-client';
import { LogOut, UserRound } from 'lucide-react';
import { getImageProps } from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {
  avatar: string | undefined;
  username: string;
};

export function AccountDropdown({ avatar, username }: Props) {
  const { props: imageProps } = getImageProps({
    src: avatar ? getProfileImage({ size: 45, path: avatar }) : '',
    alt: 'Signed in user avatar',
    width: 24,
    height: 24,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {avatar ? (
            <Avatar className="size-6">
              <AvatarImage {...imageProps} />
              <AvatarFallback>
                <UserRound />
              </AvatarFallback>
            </Avatar>
          ) : (
            <UserRound />
          )}
          {username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={logoutAction}>
          <LogOut /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
