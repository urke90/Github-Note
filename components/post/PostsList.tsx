import PostItem from './PostItem';

// ----------------------------------------------------------------

interface IPostsListProps {}

const PostsList: React.FC<IPostsListProps> = (props) => {
  return (
    <section>
      <p className="mb-5 text-[10px] uppercase text-white-500">Posts</p>
      <ul>
        <PostItem type="workflow" postText="Project setup" />
        <PostItem type="component" postText="Mobile Navigation" />
        <PostItem type="knowledge" postText="Design System" />
      </ul>
    </section>
  );
};

export default PostsList;
