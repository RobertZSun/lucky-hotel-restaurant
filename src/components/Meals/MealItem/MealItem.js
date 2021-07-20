import styles from './MealItem.module.css';
import React, {useCallback, useContext} from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
    const dishPrice = `${props.price.toFixed(1)}￥`;
    const {id, name, price} = props;
    const cartCtx = useContext(CartContext);
    const {addItem} = cartCtx;
    const addToCart = useCallback((amount) => {
        addItem({
            id,
            name,
            amount: amount,
            price
        });
    }, [id, name, price, addItem]);

    return (<li key={props.id} className={styles.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{dishPrice}</div>
        </div>
        <div>
            <MealItemForm id={props.id} onAddToCard={addToCart}/>
        </div>
    </li>);
};

export default React.memo(MealItem);