'use client';

import type { DialogProps } from '@radix-ui/react-alert-dialog';
import { FileIcon, Laptop, Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/shared/components/ui/command';

export function SearchMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search post...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={value}
          onValueChange={setValue}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>Please complete your search term</CommandEmpty>

          <CommandGroup heading="Search posts">
            <CommandItem
              value={value + 'ghost'}
              onSelect={() => {
                runCommand(() => !!value && router.push(`/?search=${value}`));
              }}
            >
              <FileIcon className="mr-2 h-4 w-4" />
              {!value ? 'Please enter your search term' : `Search: ${value}`}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem
              value="Light"
              onSelect={() => runCommand(() => setTheme('light'))}
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem
              value="Dark"
              onSelect={() => runCommand(() => setTheme('dark'))}
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem
              value="System"
              onSelect={() => runCommand(() => setTheme('system'))}
            >
              <Laptop className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
