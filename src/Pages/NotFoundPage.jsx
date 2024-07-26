import '../styles/NotFound.css'; // Make sure this path matches your CSS file's location

const NotFoundPage = () => {
    return (
        <div className="error-container vh-100">
            <h1>404</h1>
            <p>
                {`Oops! The page you're looking for is not here.`}
            </p>
            <a href="/home">
                Go Back to Home
            </a>
        </div>
    );
}

export default NotFoundPage;
