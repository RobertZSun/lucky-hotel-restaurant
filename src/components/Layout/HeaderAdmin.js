import styles from './HeaderAdmin.module.css';
import {Link, NavLink} from "react-router-dom";

const HeaderAdmin = (props) => {
    function logout() {

    }
    return (
            <header className={styles.header}>
                <Link to="/meals"><h1>好运来餐馆</h1></Link>
                <Link to="/add-dish"><span>添加新菜品</span></Link>
                <button type="button" onClick={logout}>退出</button>
            </header>
    );
};

export default HeaderAdmin;