import Header from "../components/Header";
import Background from "../components/Background";
const NavBar = () => {
  return (
    <>
      <Background>
        <Header /> {/* goes as a child*/}
      </Background>
    </>
  );
};

export default NavBar;
