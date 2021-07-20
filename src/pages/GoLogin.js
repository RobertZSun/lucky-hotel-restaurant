import {Link} from "react-router-dom";

const GoLogin = () => {
    return (<div className="centered">
        <span>您还未登录 :( </span>
        <Link to="/">回到首页</Link>
        <Link to="/login">去登录</Link>
    </div>);
};

export default GoLogin;