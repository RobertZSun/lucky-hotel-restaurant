import styles from './MealItemWithDelBtn.module.css';
import {useHistory} from "react-router-dom";

const MealItem = (props) => {
    const history = useHistory();
    const price = `${props.price.toFixed(1)}￥`;
    const {id:mealId, del}= props;
    const delFromMenu =async () => {
        await del(mealId);
        history.go(0);
    };

    return (<li key={mealId} className={styles.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{price}</div>
        </div>
        <div>
            <button type="button" onClick={delFromMenu}>
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    </li>);
};

export default MealItem;