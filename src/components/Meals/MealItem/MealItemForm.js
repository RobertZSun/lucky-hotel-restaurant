import styles from './MealItemForm.module.css';
import Input from "../../UI/Input";
import React, {useCallback, useRef, useState} from "react";

const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const {onAddToCard} = props;
    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = useCallback((event) => {
        event.preventDefault();
        const enteredAmount = +amountInputRef.current.value;
        if (enteredAmount < 1 || enteredAmount > 10) {
            setAmountIsValid(false);
            return;
        }
        onAddToCard(enteredAmount);
    }, [onAddToCard]);

    return <form className={styles.form} onSubmit={submitHandler} key={props.id}>
        <Input label="数量"
               ref={amountInputRef}
               input={{id: props.id, type: "number", name: "数量", min: "1", max: "10", step: "1", defaultValue: "1"}}/>
        <button type="submit">
            <i className="fas fa-plus"></i>
        </button>
        {!amountIsValid && <p>菜品数量可在1~10之间</p>}
    </form>;
};

export default React.memo(MealItemForm);