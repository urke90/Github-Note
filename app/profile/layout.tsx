import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import MobileNav from '@/components/navigation/MobileNav';

// ----------------------------------------------------------------

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto flex h-full max-w-[1440px]">
      <LeftSidebar />
      <div className="flex flex-1 flex-col">
        <div className="mb-[30px] md:hidden">
          <MobileNav />
        </div>
        {children}
      </div>
      <RightSidebar>{/* <RecentTagsList  /> */}</RightSidebar>
    </div>
  );
};

export default Layout;
