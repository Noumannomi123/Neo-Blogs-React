import '../styles/NotFound.css'; // Make sure this path matches your CSS file's location
import PropTypes from "prop-types";
const NotFoundPage = ({msg}) => {
    return (
        <div className="error-container vh-100">
            <h1>404</h1>
            <p>
                {msg || `Oops! The page you're looking for is not here.`}
            </p>
            <a href="/home">
                Go Back to Home
            </a>
        </div>
    );
}
NotFoundPage.propTypes = {
    msg: PropTypes.string,
};
export default NotFoundPage;
