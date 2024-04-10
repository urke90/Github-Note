import NavPostItem from './NavPostItem';

// ----------------------------------------------------------------

interface INavPostsListProps {}

const NavPostsList: React.FC<INavPostsListProps> = (props) => {
  return (
    <section>
      <p className="mb-5 text-[10px] uppercase text-white-500">Posts</p>
      <ul>
        <NavPostItem type="workflow" postText="Project setup" />
        <NavPostItem type="component" postText="Mobile Navigation" />
        <NavPostItem type="knowledge" postText="Design System" />
      </ul>
    </section>
  );
};

export default NavPostsList;
