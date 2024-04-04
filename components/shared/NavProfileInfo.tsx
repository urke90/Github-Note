import Image from 'next/image';

// ----------------------------------------------------------------

interface INavSidebarProfileInfoProps {}

const NavProfileInfo: React.FC<INavSidebarProfileInfoProps> = (props) => {
  return (
    <section className="flex">
      <Image
        src="/assets/images/github.png"
        width={36}
        height={36}
        alt="Profile Image"
        className="mr-1.5"
      />
      <div>
        <p className="p3-medium text-white-100">Uros Bijelic</p>
        <p className="p4-regular">urosbijelic90@gmail.com</p>
      </div>
    </section>
  );
};

export default NavProfileInfo;
