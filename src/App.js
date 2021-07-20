import React, {useState, Suspense, useCallback, useEffect} from "react";
import {Route, Redirect, Switch, useHistory} from "react-router-dom";
import Header from "./components/Layout/Header";
import Meals from "./pages/Meals";
import Cart from "./components/Cart/Cart";
import MyOrders from "./pages/MyOrders";
import {CartProvider} from "./store/cart-context";
import {useDispatch, useSelector} from "react-redux";
import GoLogin from "./pages/GoLogin";

// import AddMealFormWithMenu from "./pages/AddMealFormWithMenu";
// import NotFound from "./pages/NotFound";
// import LoginPage from "./pages/LoginPage";

const AddMealFormWithMenu = React.lazy(() => import('./pages/AddMealFormWithMenu').then(({default: AddMealFormWithMenu}) => ({default: AddMealFormWithMenu})));
const NotFound = React.lazy(() => import('./pages/NotFound').then(({default: NotFound}) => ({default: NotFound})));
const LoginPage = React.lazy(() => import('./pages/LoginPage').then(({default: LoginPage}) => ({default: LoginPage})));

function calRemainingTime(time) {
    const presentTime = Date.now();
    const timeInMilliseconds = time.getTime();
    return (timeInMilliseconds - presentTime);
}

let timer;

function App() {
    const dispatch = useDispatch();
    const history = useHistory();

    const isLoggedIn = useSelector(state => state.isLoggedIn);

    const [cartShown, setCartShown] = useState(false);

    const showCartHandler = useCallback(() => {
        setCartShown(true);
    }, []);

    const hideCartHandler = useCallback(() => {
        setCartShown(false);
    }, []);

    useEffect(() => {
        const idToken = localStorage.getItem("token");
        const expiresInMillisecond = localStorage.getItem("expiresOn");
        const expiresDate = new Date(+expiresInMillisecond);
        const remainingTIme = calRemainingTime(expiresDate);

        if (expiresInMillisecond && remainingTIme >= 10 * 60 * 1000) {
            timer = setTimeout(() => {
                dispatch({type: "logout"});
                history.replace("/meals");
            }, remainingTIme);
            if (idToken) {
                dispatch({type: "autoLogin", payload: {idToken, expiresDate, isLoggedIn: true, timer}});
            }
        } else if (expiresInMillisecond && remainingTIme < 10 * 60 * 1000) {
            dispatch({type: "logout"});
        }
    }, [dispatch, history]);

    return (
        <CartProvider>
            {cartShown && <Cart onCloseCart={hideCartHandler}/>}
            <Header onShowCart={showCartHandler}/>
            <main>
                <Suspense fallback={<div style={{margin: '0 auto'}}>加载中...</div>}>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/meals"/>
                        </Route>
                        <Route path="/meals">
                            <Meals/>
                        </Route>
                        <Route path="/add-dish">
                            {isLoggedIn && <AddMealFormWithMenu/>}
                            {!isLoggedIn && <Redirect to="/login"/>}
                        </Route>
                        <Route path="/login">
                            {!isLoggedIn && <LoginPage/>}
                            {isLoggedIn && <Redirect to="/add-dish"/>}
                        </Route>
                        <Route path="/orders">
                            {isLoggedIn && <MyOrders/>}
                            {!isLoggedIn && <GoLogin />}
                        </Route>
                        <Route path="*">
                            <NotFound/>
                        </Route>
                    </Switch>
                </Suspense>
            </main>
        </CartProvider>
    );
}

export default App;
