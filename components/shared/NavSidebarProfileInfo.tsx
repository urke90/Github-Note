import Image from 'next/image';

// ----------------------------------------------------------------

interface INavSidebarProfileInfoProps {}

const NavSidebarProfileInfo: React.FC<INavSidebarProfileInfoProps> = (
  props
) => {
  return (
    <div className="flex">
      <Image
        src="/assets/images/github.png"
        width={36}
        height={36}
        alt="Profile Image"
        className="mr-4"
      />
      <div>
        <p className="p3-medium text-white-100">Uros Bijelic</p>
        <p className="p4-regular">urosbijelic90@gmail.com</p>
      </div>
    </div>
  );
};

export default NavSidebarProfileInfo;
