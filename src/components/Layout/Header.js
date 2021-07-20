import styles from './Header.module.css';
import mealsImage from '../../assets/meals.png';
import React, {Fragment} from "react";
import HeaderCartButton from "./HeaderCartButton";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const Header = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const logout = () => {
        dispatch({type: "logout"});
        history.replace("/meals");
    };

    return (
        <Fragment>
            <header className={styles.header}>
                <Link to="/meals"><h1>好运来餐馆</h1></Link>
                <nav>
                    <ul>
                        {isLoggedIn && <li>
                            <Link to="/add-dish">菜品管理</Link>
                        </li>}
                        {isLoggedIn && <li>
                            <Link to="/orders">查看订单</Link>
                        </li>}
                        {isLoggedIn && <li>
                            <button className={styles.logout} type="button" onClick={logout}>退出</button>
                        </li>}
                        {!isLoggedIn && <li>
                            <HeaderCartButton onClick={props.onShowCart}/>
                        </li>}
                    </ul>
                </nav>

            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="a table full of chinese dishes"/>
            </div>
        </Fragment>
    );
};

export default React.memo(Header);