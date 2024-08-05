import "../styles/Background.css";
import AllPosts from "../components/AllPosts";
import Loader, { HelperLoader } from "../components/Loader";
import NavBar from "../components/NavBar";
import { useContext } from "react";
import AuthContext from "../components/AuthContext";
const Home = () => {
  const { loggedIn } = useContext(AuthContext);
  if (HelperLoader()) return <Loader />;
  if (!loggedIn)
    return (
      <>
        <NavBar />
        <Loader>
          <h4 className="mt-4">Check if you are logged in.</h4>
        </Loader>
      </>
    );
  return (
    <>
      <NavBar />
      <AllPosts />
    </>
  );
};

export default Home;
