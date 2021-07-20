import {Link} from "react-router-dom";

const NotFound = () => {
    return (<div className="centered">
        <span>404 迷路啦...</span>
        <Link to="/">回到首页</Link>
    </div>);
};

export default NotFound;