import Header from "../components/Header";
import Background from "../components/Background";
import "../styles/Background.css";
import AllPosts from "../components/AllPosts";
import Loader, { HelperLoader } from "../components/Loader";
const Home = () => {
  if (HelperLoader()) return <Loader />;
  return (
    <>
      <Background>
        <Header /> {/* goes as a child*/}
      </Background>
      <AllPosts />
    </>
  );
};

export default Home;
