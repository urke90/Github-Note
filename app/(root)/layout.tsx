import MobileNav from '@/components/navigation/MobileNav';
import LeftSidebar from '@/components/sidebars/LeftSidebar';
import RightSidebar from '@/components/sidebars/RightSidebar';

// ----------------------------------------------------------------

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="flex h-screen">
      <LeftSidebar />
      <main className="flex flex-1 flex-col">
        <div className="md:hidden">
          <MobileNav />
        </div>
        {children}
      </main>
      <RightSidebar />
    </section>
  );
};

export default Layout;
