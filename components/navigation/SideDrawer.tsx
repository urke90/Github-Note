import {
  Drawer,
  // DrawerClose,
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
    <div className="border-2 border-blue-400">
      <Drawer direction={direction}>
        <DrawerTrigger asChild>{drawerTrigger}</DrawerTrigger>
        <DrawerOverlay className="fixed inset-0" />
        <DrawerContent className="w-[322px]">
          <DrawerHeader className="relative z-50">
            <DrawerTitle>DRAWER TITLE</DrawerTitle>
            <DrawerDescription>DESCRIPTION</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
