import Image from 'next/image';
import SideDrawer from './SideDrawer';

// ----------------------------------------------------------------

interface IHeaderMobileProps {}

const HeaderMobile: React.FC<IHeaderMobileProps> = () => {
  return (
    <header className="flex-between border-2 bg-black-800 px-5 py-6">
      <Image src="/assets/images/Logo.svg" width={102} height={24} alt="Logo" />

      <SideDrawer
        drawerTrigger={
          <Image
            src="/assets/images/burger.svg"
            width={30}
            height={30}
            alt="Menu"
            className="cursor-pointer"
          />
        }
      />
    </header>
  );
};

export default HeaderMobile;
