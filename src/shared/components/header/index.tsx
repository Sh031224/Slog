import { ActivityIcon } from 'lucide-react';
import Link from 'next/link';

import { auth } from '@/lib/auth';

import { ProfileNav } from './profile-nav';
import { SearchMenu } from './search-menu';
import { SignInButton } from './sign-in-button';
import { ThemeToggle } from './theme-toggle';
import { GithubIcon } from '../icons/github-icon';
import { Button } from '../ui/button';

export async function Header() {
  const user = (await auth())?.user;

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <ActivityIcon size="24" />

          <span className="font-bold">Slog</span>
        </Link>

        <div className="flex items-center">
          <SearchMenu />

          {!user && <SignInButton />}

          <Link
            href="https://github.com/Sh031224/Slog"
            className="block"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            <Button variant="ghost" className="w-9 shrink-0 px-0">
              <GithubIcon className="h-5 w-5" />

              <span className="sr-only">Github</span>
            </Button>
          </Link>

          <ThemeToggle />

          {!!user && <ProfileNav user={user} />}
        </div>
      </div>
    </header>
  );
}
