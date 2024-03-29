import HeaderMobile from '@/components/navigation/HeaderMobile';

// 1. izvaditi sve boje iz figme u tailwind config
// 2. namestiti font-family
// 3. namestiti sve variants button-a
// * kada namestim config i button as example
// 1. MongoDB --- nov projekat
// 2. mongoose --- namestiti povezati
// 3. Next-auth --- email pw, google, github
// 4. Login page --- sign-up i sign-in ( prvo uraditi sa github-om pa google)

// * branch
// feature/tailwind-styles
// feat / tailwind - styling;
// feat / authentication;

// app/(auth)/login/page.tsx implement RHF + ZOD ili Yup
// REGIISTE
const Home: React.FC = () => {
  return (
    <div className="w-full p-4">
      <h2>THIS IS HOME PAGE</h2>
      {/* <h2 className="h2-bold">this is some text</h2>
      <p className="p1-medium">Paragraph 1 Medium</p> */}
    </div>
  );
};

export default Home;
