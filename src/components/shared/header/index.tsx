import { ActivityIcon } from 'lucide-react';
import Link from 'next/link';

import { AuthButton } from './auth-button';
import { SearchMenu } from './search-menu';
import { ToggleMode } from './toggle-mode';
import { GithubIcon } from '../social-icons';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <ActivityIcon size="24" />

          <span className="font-bold">Slog</span>
        </Link>

        <div className="flex items-center">
          <SearchMenu />

          <AuthButton />

          <Link
            href="https://github.com/Sh031224/Slog"
            className="block"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" className="w-9 shrink-0 px-0">
              <GithubIcon className="h-5 w-5" />

              <span className="sr-only">Github</span>
            </Button>
          </Link>

          <ToggleMode />
        </div>
      </div>
    </header>
  );
}
