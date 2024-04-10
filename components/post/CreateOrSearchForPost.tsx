import Image from 'next/image';
import { Button } from '../ui/button';
import SearchCommandDialog from '../shared/SearchCommandDialog';

// ----------------------------------------------------------------

interface ICreateOrSearchPostProps {
  showCreatePostButton?: boolean;
}

const CreateOrSearchForPost: React.FC<ICreateOrSearchPostProps> = ({
  showCreatePostButton = true,
}) => {
  return (
    <section>
      {showCreatePostButton && (
        <Button variant="gradient" className="mb-4 text-white-100">
          <Image
            src="/assets/images/Plus.svg"
            width={14}
            height={14}
            alt="Add"
          />
          <p className="p4-medium !text-white-100">Create Post</p>
        </Button>
      )}

      <SearchCommandDialog />
    </section>
  );
};

export default CreateOrSearchForPost;
