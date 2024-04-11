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
    <section className="mx-auto flex h-full max-w-[1440px] justify-center">
      <LeftSidebar />
      <main className="flex flex-1 flex-col pt-10">
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
