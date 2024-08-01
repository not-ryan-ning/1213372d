import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div>
            <h1>Error 404: Not Found</h1>
            <Link to="/">Return home!</Link>
        </div>
    );

};

export default NotFoundPage