import Header from "../components/Header";
import Background from "../components/Background";
import "../styles/Background.css";
const Home = () => {
  return (
    <Background>
      <Header /> {/* goes as a child*/}
    </Background>
  );
};

export default Home;
