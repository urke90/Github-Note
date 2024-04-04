import NavProfileInfo from '../shared/NavProfileInfo';
import TagsList from '../tag/TagsList';
import RelatedPosts from '../post/RelatedPosts';

// ----------------------------------------------------------------

type Props = {};

const RightSidebar = (props: Props) => {
  return (
    <aside className="flex max-w-[290px] flex-col bg-black-800 px-7 py-10 max-md:hidden">
      <div className="mb-12">
        <NavProfileInfo />
      </div>
      <section>
        {/* <TagsList /> */}
        <RelatedPosts />
      </section>
    </aside>
  );
};

export default RightSidebar;
