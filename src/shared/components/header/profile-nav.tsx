'use client';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import type { User } from 'next-auth';
import { signOut } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

type Props = {
  user: User;
};

export function ProfileNav({ user }: Props) {
  const handleSignOut = (e: Event) => {
    e.preventDefault();

    signOut({
      /**
       * https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-5-migrating-routing-hooks
       * not implements yet for basePath hook
       */
      callbackUrl: `${window.location.origin}/sign-in`
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-2">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name || 'profile'} />
          ) : (
            <AvatarFallback>
              <span className="sr-only">{user.name}</span>
              <UserIcon className="h-4 w-4" />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onSelect={handleSignOut}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
