import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import MobileNav from '@/components/navigation/MobileNav';

// ----------------------------------------------------------------

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="mx-auto flex h-full max-w-[1440px]">
      <LeftSidebar />
      <main className="flex flex-1 flex-col">
        <div className="mb-[30px] md:hidden">
          <MobileNav />
        </div>
        {children}
      </main>
      <RightSidebar />
    </section>
  );
};

export default Layout;
