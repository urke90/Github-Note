'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import SearchCommandDialog from '../shared/SearchCommandDialog';
import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------

const CreateOrSearchForPost: React.FC = () => {
  const pathname = usePathname();

  return (
    <section>
      {pathname !== '/post/create' && (
        <Link href="/post/create">
          <Button variant="gradient" className="mb-4 text-white-100">
            <Image
              src="/assets/icons/plus-bg-white.svg"
              width={14}
              height={14}
              alt="Add"
            />
            <p className="p4-medium !text-white-100">Create Post</p>
          </Button>
        </Link>
      )}

      <SearchCommandDialog />
    </section>
  );
};

export default CreateOrSearchForPost;
