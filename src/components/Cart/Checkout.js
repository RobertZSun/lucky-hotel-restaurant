import styles from './Checkout.module.css';
import {useRef, useState} from "react";

function checkEmpty(value) {
    return value.trim() === "";
}

function checkPhone(value) {
    const cellphoneRegExp = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    const officePhoneRefExp = /0\d{2,3}-\d{7,8}(-\d{1,6})?/;
    const number = value.trim();
    return cellphoneRegExp.test(number) || officePhoneRefExp.test(number);
}

const Checkout = (props) => {
    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const phoneInputRef = useRef();
    const noteInputRef = useRef();

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        address: true,
        phone: true,
    });

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredNote = noteInputRef.current.value || "null";

        const nameIsValid = !checkEmpty(enteredName);
        const addressIsValid = !checkEmpty(enteredAddress);
        const phoneIsValid = checkPhone(enteredPhone);

        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const date = new Date().getDate();
        const hour = new Date().getHours();
        const minutes = new Date().getMinutes();
        const seconds = new Date().getSeconds();
        const timeStamp = `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`

        setFormInputsValidity({
            name: nameIsValid,
            address: addressIsValid,
            phone: phoneIsValid,
        });

        const formIsValid = nameIsValid && addressIsValid && phoneIsValid;
        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            timeID: timeStamp,
            name: enteredName,
            address: enteredAddress,
            phone: enteredPhone,
            note: enteredNote,
        });
    };

    const nameControlClasses = `${styles.control} ${formInputsValidity.name ? '' : styles.invalid}`;
    const addressControlClasses = `${styles.control} ${formInputsValidity.address ? '' : styles.invalid}`;
    const phoneControlClasses = `${styles.control} ${formInputsValidity.phone ? '' : styles.invalid}`;

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name">姓名</label>
                <input type="text" id="name" name="name" ref={nameInputRef}/>
                {!formInputsValidity.name && <p className={styles.error}>* 姓名不能为空</p>}
            </div>
            <div className={addressControlClasses}>
                <label htmlFor="address">地址</label>
                <input type="text" id="address" name="address" ref={addressInputRef}/>
                {!formInputsValidity.address && <p className={styles.error}>* 地址不能为空</p>}
            </div>
            <div className={phoneControlClasses}>
                <label htmlFor="phone">电话</label>
                <input type="text" id="phone" name="phone" ref={phoneInputRef}/>
                {!formInputsValidity.phone && <p className={styles.error}>* 电话号码错误，格式不正确</p>}
            </div>
            <div className={styles.control}>
                <label htmlFor="note">备注</label>
                <textarea id="note" name="note" rows="5" cols="42" ref={noteInputRef}/>
            </div>
            <div className={styles.actions}>
                <button type="button" onClick={props.onCancel}>
                    取消
                </button>
                <button className={styles.submit}>确认</button>
            </div>
        </form>
    );
};

export default Checkout;