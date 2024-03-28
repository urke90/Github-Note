import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  // DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerOverlay,
  // DrawerPortal,
} from '../ui/drawer';
import { Button } from '../ui/button';
import Image from 'next/image';
import { X } from 'lucide-react';

// ----------------------------------------------------------------

interface ISideDrawerProps {
  direction?: 'top' | 'bottom' | 'left' | 'right';
  drawerTrigger: React.ReactNode;
}

const SideDrawer: React.FC<ISideDrawerProps> = ({
  drawerTrigger,
  direction = 'right',
}) => {
  return (
    <Drawer direction={direction}>
      <DrawerTrigger asChild>{drawerTrigger}</DrawerTrigger>
      {/* <DrawerOverlay className="fixed inset-0" /> */}
      <DrawerContent className="w-[322px] px-5 py-8">
        <DrawerHeader>
          <div className="flex-between">
            <div className="flex">
              <Image
                src="/assets/images/github.png"
                width={36}
                height={36}
                alt="Profile Image"
                className="mr-4"
              />
              <div>
                <p className="p3-medium text-white-100">Uros Bijelic</p>
                <p className="p4-regular">urosbijelic90@gmail.com</p>
              </div>
            </div>
            <DrawerClose>
              <X className="text-white-100" />
            </DrawerClose>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
