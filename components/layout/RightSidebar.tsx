import NavProfileInfo from '../shared/NavProfileInfo';

// ----------------------------------------------------------------

interface IRightSidebarProps {
  children: React.ReactNode;
}

const RightSidebar: React.FC<IRightSidebarProps> = ({ children }) => {
  return (
    <aside className="flex w-full max-w-[290px] flex-col border-l-[1.5px] border-l-[#4448691A] bg-black-800 px-7 py-10 max-xl:hidden">
      <div className="mb-12">
        <NavProfileInfo />
      </div>
      {children}
    </aside>
  );
};

export default RightSidebar;

// // DEV TODAY

// // SORT AND FILTE
// /**
//  * 1. po crreate at
//  * 2. popular - grupa sa najvise komentara u poslednjh 24 h
//  * 3. joined groups -> grupe u kojima sam member
//  */

// // TOP RANKED
// /**
//  * Grupe sa najvise postova
//  */

// // ACTIVE
// /**
//  * Grupe sa najvise memebera
//  */
