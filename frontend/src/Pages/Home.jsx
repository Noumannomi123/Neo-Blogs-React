import Header from "../components/Header";
import Background from "../components/Background";
import "../styles/Background.css";
import AllPosts from "../components/AllPosts";
const Home = () => {
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
