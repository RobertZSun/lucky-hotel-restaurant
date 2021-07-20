import styles from './Cart.module.css';
import Modal from "../UI/Modal";
import {useContext, useState, Fragment} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import axios from 'axios';


const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [orderID, setOrderID] = useState(null);
    const [orderFullID, setOrderFullID] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `${cartCtx.totalAmount.toFixed(1)}￥`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({
            ...item,
            amount: 1,
        });
    };
    const cartItemRemoveHandler = (itemId) => {
        cartCtx.removeItem(itemId);
    };

    const cartItems = cartCtx.items.map(item => <CartItem key={item.id} id={item.id} name={item.name}
                                                          price={item.price} amount={item.amount}
                                                          onRemove={cartItemRemoveHandler.bind(null, item.id)}
                                                          onAdd={cartItemAddHandler.bind(null, item)}/>);
    const dishes = cartCtx.items.reduce((acc, item) => {
        acc.push({
            name: item.name,
            price: item.price,
            amount: item.amount,
        });
        return acc;
    }, []);
    const orderHandler = () => {
        setIsCheckout(true);
    };

    const cancelOrderHandler = () => {
        setIsCheckout(false);
    };

    const submitOrderHandler = async (userData) => {
        const fullYear = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const date = new Date().getDate();
        const hour = new Date().getHours();
        // const fullYear = 2020;
        // const month = 10;
        // const date = 1;

        setIsSubmitting(true);
        const generalCurrentDayId = `${fullYear}/${month}/${date}/${hour}`;
        // const generalCurrentDayId = `${fullYear}/M${month}/D${date}/H${hour}`;
        const urlToPost = `https://lucky-hotel-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${generalCurrentDayId}.json`;
        const postConfig = {
            ...userData,
            totalAmount,
            dishes,
        };
        try {
            const response = await axios.post(urlToPost, postConfig);
            const responseData = await response.data.name;
            setOrderID(responseData.slice(-6));
            setOrderFullID(responseData);
            setIsSubmitting(false);
            setAlreadySubmitted(true);
            console.log(responseData);
            cartCtx.clear();
        } catch (error) {
            console.log(error);
        }
    };

    const orderConfirmed = () => {
        setAlreadySubmitted(false);
        setIsCheckout(false);
        props.onCloseCart();
    };

    const actionsElements = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onCloseCart}>取消</button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>支付</button>}
    </div>;

    const cartItemClass = isCheckout ? styles['cart-items-flat'] : styles['cart-items']
    const cartModalContent = (<Fragment>
        <ul className={cartItemClass}>{cartItems}</ul>
        <div className={styles.total}>
            <span>总计：</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} dishes={cartCtx.items} onCancel={cancelOrderHandler}/>}
        {!isCheckout && actionsElements}
    </Fragment>);

    const isSubmittingModalContent = <p>发送订单信息...</p>;

    const confirmationsInfo = <section className={styles['order-info']}>
        <p>您的订单编号全：{orderFullID}</p>
        <p>您的订单编号后6位是：{orderID}</p>
        <div>请截图或照相以备查询之用</div>
        <div>本店联系电话：110120119</div>
        <div className={styles['form-control']}>
            <button className={styles['button-confirm']} onClick={orderConfirmed}>确认</button>
        </div>
    </section>;

    return (
        <Modal onClose={props.onCloseCart}>
            {!isSubmitting && !alreadySubmitted && cartModalContent}
            {isSubmitting && !alreadySubmitted && isSubmittingModalContent}
            {!isSubmitting && alreadySubmitted && confirmationsInfo}
        </Modal>
    );
};

export default Cart;