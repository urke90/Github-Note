import NavProfileInfo from '../shared/NavProfileInfo';
import TagsList from '../tag/TagsList';

// ----------------------------------------------------------------

const RightSidebar: React.FC = () => {
  return (
    <aside className="flex w-full max-w-[290px] flex-col border-l-[1.5px] border-l-[#4448691A] bg-black-800 px-7 py-10 max-xl:hidden">
      <div className="mb-12">
        <NavProfileInfo />
      </div>
      <section>
        <TagsList />
      </section>
    </aside>
  );
};

export default RightSidebar;
