import '../globals.css';

// ----------------------------------------------------------------

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <section className="flex h-screen">
      <div className="flex flex-1 flex-col">{children}</div>
    </section>
  );
};

export default Layout;
