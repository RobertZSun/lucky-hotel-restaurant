import {useEffect, useRef, useState} from 'react';

import styles from './AuthForm.module.css';
import Card from "../UI/Card";
import {useHistory} from "react-router-dom";

import {getSecretKey, login, signup} from "../../utility_funcs/auth_related";
import {useDispatch} from "react-redux";


function checkEmail(value) {
    return value.trim().includes("@");
}

function checkPassword(value) {
    return value.trim().length >= 6;
}

function calRemainingTime(time) {
    const presentTime = Date.now();
    const timeInMilliseconds = time.getTime() ;
    return (timeInMilliseconds - presentTime);
}

const AuthForm = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const keyInputRef = useRef();

    const [isLogin, setIsLogin] = useState(true);
    const [secretKey, setSecretKey] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [formInputsValidity, setFormInputsValidity] = useState({
        email: true,
        password: true,
        key: true,
    });

    useEffect(() => {
        async function init() {
            try {
                const key = await getSecretKey();
                setSecretKey(key+key);
            } catch (e) {
                console.log(e);
            }
        }

        init();
        return () => {
            setSecretKey(false);
        };
    }, []);

    async function loginUser(email, password) {
        const response = await login(email, password);
        const idToken = response.idToken;
        const expiresIn = response.expiresIn;
        const expiresDate = new Date(
            // new Date().getTime() + 5000
            new Date().getTime() + +expiresIn * 1000
        );
        const remainingTIme = calRemainingTime(expiresDate);
        const timer = setTimeout(()=>{
            dispatch({type: "logout"});
            history.replace("/meals")
        },remainingTIme);
        dispatch({type: "login", payload: {idToken, expiresDate, timer}});
    }

    async function signupUser(email, password) {
        const idToken = await signup(email, password);
        // const expiresDate = new Date(new Date().getTime() + (5 * 1000));
        const expiresDate = new Date(new Date().getTime() + 3600 * 1000);
        const remainingTIme = calRemainingTime(expiresDate);
        const timer = setTimeout(()=>{
            dispatch({type: "logout"});
            history.replace("/meals")
        },remainingTIme);
        dispatch({type: "signup", payload: {idToken,  expiresDate, timer}});
        console.log("signup");
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let enteredKey, keyIsValid, formIsValid;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const emailIsValid = checkEmail(enteredEmail);
        const passwordIsValid = checkPassword(enteredPassword);
        if (isLogin) {
            setFormInputsValidity({
                email: emailIsValid,
                password: passwordIsValid,
                key: true,
            });
            formIsValid = emailIsValid && passwordIsValid;
        } else {
            enteredKey = keyInputRef.current.value;
            keyIsValid = (enteredKey.trim() === secretKey);
            setFormInputsValidity({
                email: emailIsValid,
                password: passwordIsValid,
                key: keyIsValid,
            });
            formIsValid = emailIsValid && passwordIsValid && keyIsValid;
        }
        if (!formIsValid) {
            return;
        }
        setIsLoading(true);
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        if (isLogin) {
            await loginUser(enteredEmail, enteredPassword);
        } else {
            keyInputRef.current.value = "";
            await signupUser(enteredEmail, enteredPassword);
        }
        setIsLoading(false);
    };

    function cancel() {
        history.push("/meals");
    }

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    };


    const emailControlClasses = `${styles.control} ${formInputsValidity.email ? '' : styles.invalid}`;
    const passwordControlClasses = `${styles.control} ${formInputsValidity.password ? '' : styles.invalid}`;
    const keyControlClasses = `${styles.control} ${formInputsValidity.key ? '' : styles.invalid}`;

    return (<section className={styles.outerRange}>
            <Card>
                <h1>{isLogin ? '??????' : '??????'}</h1>
                <form className={styles.form} onSubmit={submitHandler}>
                    <div className={emailControlClasses}>
                        <label htmlFor="email">?????????</label>
                        <input type="email" id="email" name="email" ref={emailInputRef}/>
                        {!formInputsValidity.email && <p className={styles.error}>* ??????????????????????????????</p>}
                    </div>
                    <div className={passwordControlClasses}>
                        <label htmlFor="password">?????????</label>
                        <input type="password" id="password" name="password" ref={passwordInputRef}/>
                        {!formInputsValidity.password && <p className={styles.error}>* ?????????????????????6???</p>}
                    </div>
                    {!isLogin && <div className={keyControlClasses}>
                        <label htmlFor="key">?????????</label>
                        <input type="text" id="key" name="key" ref={keyInputRef}/>
                        {!formInputsValidity.key && <p className={styles.error}>* ???????????????</p>}
                    </div>}
                    <div className={styles.actions}>
                        <button type="button" onClick={cancel}>
                            ??????
                        </button>
                        <button type="button" className={styles.toggle} onClick={switchAuthModeHandler}>
                            {isLogin ? '??????????????????' : '?????????????????????'}
                        </button>
                        {!isLoading && <button className={styles.submit}>{isLogin ? '??????' : '??????'}</button>}
                        {isLoading && <button disabled>?????????...</button>}
                    </div>
                </form>
            </Card>
        </section>
    );
};

export default AuthForm;
