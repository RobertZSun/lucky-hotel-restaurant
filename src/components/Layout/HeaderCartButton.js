import styles from './HeaderCartButton.module.css';
import {useContext, useEffect, useState} from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const numberOfDishes = cartCtx.items.reduce((currentNumber, dish) => currentNumber += dish.amount, 0);


    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);
        return ()=>{
            clearTimeout(timer);
        };
    }, [cartCtx.items]);

    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={styles.icon}><CartIcon/></span>
        <span>购物车</span>
        <span className={styles.badge}>{numberOfDishes}</span>
    </button>;
};

export default HeaderCartButton;