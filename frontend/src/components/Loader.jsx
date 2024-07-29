import loader from "../assets/loader.png";
import '../styles/Loader.css'
const Loader = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <img src={loader} alt="loading-image" height={150} width={150} />
    </div>
  );
};

export default Loader;
