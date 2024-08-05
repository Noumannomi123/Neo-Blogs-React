import "../styles/Background.css";
import AllPosts from "../components/AllPosts";
import Loader, { HelperLoader } from "../components/Loader";
import NavBar from "../components/NavBar";
const Home = () => {
  if (HelperLoader()) return <Loader />;

  return (
    <>
      <NavBar />
      <AllPosts />
    </>
  );
};

export default Home;
