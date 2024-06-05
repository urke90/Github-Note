'use client';

import { Button } from '../ui/button';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';

const SearchCommandDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="relative">
      <Button
        className="flex-between h-9 w-full rounded bg-black-700 px-2.5 text-white-300"
        onClick={() => setIsOpen((open) => !open)}
      >
        <div className="flex-center">
          <Image
            src="/assets/icons/search.svg"
            width={16}
            height={16}
            alt="Search"
            className="mr-2"
          />
          <p className="p4-medium">Search...</p>
        </div>
        <kbd className="flex-center pointer-events-none select-none gap-1 text-[16px]">
          <CommandShortcut className="mt-0.5 text-[18px]">⌘</CommandShortcut>K
        </kbd>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandGroup>
            <CommandItem>
              <Image
                src="/assets/images/Frame.svg"
                width={16}
                height={16}
                alt="search text"
                className="mr-3"
              />
              Explore all posts
            </CommandItem>
            <CommandItem>
              <Image
                src="/assets/images/icn-computer.svg"
                width={16}
                height={16}
                alt="search text"
                className="mr-3"
              />
              User Authentication
            </CommandItem>
            <CommandItem>
              <Image
                src="/assets/images/icn-message-circle.svg"
                width={16}
                height={16}
                alt="search text"
                className="mr-3"
              />
              Toggle class names with Clsx
            </CommandItem>
            <CommandItem>
              <Image
                src="/assets/images/icn-list-number.svg"
                width={16}
                height={16}
                alt="search text"
                className="mr-3"
              />
              User Authentication
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchCommandDialog;
