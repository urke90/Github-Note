import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

// ----------------------------------------------------------------

interface IMenuProps {}

const ComponentMenu: React.FC = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src="/assets/icons/icn-more-vertical.svg"
          alt="Menu"
          width={24}
          height={24}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-2">
          <Image
            src="/assets/icons/icn-edit.svg"
            alt="Menu"
            width={14}
            height={14}
          />
          <span className="text-sm text-white-100">Upadete Post</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Image
            src="/assets/icons/icn-trash.svg"
            alt="Menu"
            width={14}
            height={14}
          />
          <span className="text-sm text-white-100">Delete Post</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ComponentMenu;
