import styles from './CartItem.module.css';

const CartItem = (props) => {
  const price = `${props.price.toFixed(1)}￥`;

  return (
    <li className={styles['cart-item']} key={props.id}>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{price}</span>
          <span className={styles.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
