'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';

const SearchCommandDialog = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div className="flex-between w-full rounded bg-black-700 px-2.5 py-1">
        <div className="flex-center">
          <Image
            src="/assets/images/Search.svg"
            width={16}
            height={16}
            alt="Search"
            className="mr-2"
          />
          <p className="p4-medium">Search...</p>
        </div>
        <kbd className="flex-center pointer-events-none select-none gap-1 text-[16px] ">
          <CommandShortcut className="mt-0.5 text-[18px]">⌘</CommandShortcut>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandGroup>
            <CommandItem className="text-white-300">
              <Image
                src="/assets/images/Frame.svg"
                width={16}
                height={16}
                alt="search text"
                className="mr-3"
              />
              <span className="text-white-300">Explore all posts</span>
            </CommandItem>
            <CommandItem className="text-white-300">
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
    </>
  );
};

export default SearchCommandDialog;
