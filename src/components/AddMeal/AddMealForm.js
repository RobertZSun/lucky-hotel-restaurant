import styles from './AddMealForm.module.css';
import Card from "../UI/Card";
import useInput from "../../hooks/use-input";
import { useState} from "react";
import {Prompt, useHistory} from "react-router-dom";
import {
    checkCuisine,
    createCuisines,
    checkDish,
    addDish,
} from '../../utility_funcs/meal_related';

const checkNotEmpty = (content) => {
    return content.trim().length > 0;
};

const checkPrice = (price) => {
    return !isNaN(+price) && +price > 0;
};

const AddMealForm = () => {
    const history = useHistory();
    const [error, setError] = useState(null);
    const [isEntered, setIsEntered] = useState(false);

    const {
        value: cuisineValue,
        isValid: cuisineValueIsValid,
        hasError: cuisineHasError,
        valueChangeHandler: cuisineValueChangeHandler,
        inputBlurHandler: cuisineValueBlurHandler,
        // reset: cuisineReset
    } = useInput(checkNotEmpty);


    const {
        value: nameValue,
        isValid: nameValueIsValid,
        existed: nameExisted,
        setExisted: setNameExisted,
        hasError: nameHasError,
        valueChangeHandler: nameValueChangeHandler,
        inputBlurHandler: nameValueBlurHandler,
        reset: nameReset
    } = useInput(checkNotEmpty);

    const {
        value: despValue,
        isValid: despValueIsValid,
        hasError: despHasError,
        valueChangeHandler: despValueChangeHandler,
        inputBlurHandler: despValueBlurHandler,
        reset: despReset
    } = useInput(checkNotEmpty);

    const {
        value: priceValue,
        isValid: priceValueIsValid,
        hasError: priceHasError,
        valueChangeHandler: priceValueChangeHandler,
        inputBlurHandler: priceValueBlurHandler,
        reset: priceReset
    } = useInput(checkPrice);

    async function submitHandler(e) {
        e.preventDefault();
        setIsEntered(false);
        const formData = {
            cuisine: cuisineValue,
            name: nameValue,
            description: despValue,
            price: +priceValue,
        };
        console.log(formData);
        setError(null);
        try {
            let checkCuisineExists = await checkCuisine(cuisineValue);
            console.log(checkCuisineExists);

            if (checkCuisineExists.existedId) {
                console.log("已经存在了这个菜系" + checkCuisineExists.existedId);
            } else {
                console.log("wrong doesn't exist and will create it: ");
                checkCuisineExists.existedId = await createCuisines(cuisineValue);
                console.log(checkCuisineExists);
            }
            let checkDishExists = await checkDish(checkCuisineExists, nameValue);
            console.log(checkDishExists);
            if (checkDishExists) {
                console.log("已经存在了这个菜" + checkDishExists);
                setNameExisted(true);
                return Promise.reject(`当前菜品 ${formData} 已经存在了`);
            } else {
                console.log("dish doesn't exist and will create it: ");
                checkDishExists = await addDish(checkCuisineExists.existedId, formData);
                console.log("菜创建成功： " + checkDishExists);
                reset();
                history.go(0);
                return Promise.resolve(checkDishExists);
            }
        } catch (e) {
            console.log(e);
            console.log(e.message);
            setError(e.message);
        }
    }

    function reset() {
        // cuisineReset();
        nameReset();
        despReset();
        priceReset();
        setIsEntered(false);
    }

    function cancel(e) {
        setIsEntered(false);
        setTimeout(()=>{
            history.push("/meals");
        },300);
    }

    const cuisineClasses = cuisineHasError ? `${styles['form-control']} ${styles.invalid}` : styles["form-control"];
    const nameClasses = nameHasError || nameExisted ? `${styles['form-control']} ${styles.invalid}` : styles["form-control"];
    const despClasses = despHasError ? `${styles['form-control']} ${styles.invalid}` : styles["form-control"];
    const priceClasses = priceHasError ? `${styles['form-control']} ${styles.invalid}` : styles["form-control"];

    let cannotSubmit = true;
    if (cuisineValueIsValid && nameValueIsValid && !nameExisted && despValueIsValid && priceValueIsValid) {
        cannotSubmit = false;
    }

    function formFocusedHandler() {
        setIsEntered(true);
    }

    return (
        <section className={styles.form}>
            {error && <Card><p>{error}</p></Card>}
            <Prompt when={isEntered} message={(location) => "表格内所填菜品信息都将消失，确定现在离开吗？"}/>
            <Card>
                <form onFocus={formFocusedHandler} onSubmit={submitHandler} className={styles['form-control']}>
                    <div className={styles["control-group"]}>
                        <div className={cuisineClasses}>
                            <label htmlFor="cuisine">菜系（大类）</label>
                            <input type="text" name="cuisine" id="cuisine" onChange={cuisineValueChangeHandler}
                                   onBlur={cuisineValueBlurHandler}
                                   value={cuisineValue}
                                   placeholder="比如川菜，凉菜，甜品类，或者精品炒菜..."
                                   className={cuisineClasses}/>
                            {cuisineHasError && <p className={styles["error-text"]}>其提供当前菜系名称或当前同类菜品类别名称</p>}
                        </div>
                        <div className={nameClasses}>
                            <label htmlFor="name">菜品名称</label>
                            <input type="text" name="name" id="name" className={nameClasses}
                                   value={nameValue}
                                   onChange={nameValueChangeHandler} onBlur={nameValueBlurHandler}/>
                            {nameHasError && <p className={styles["error-text"]}>其提供当前菜品名称</p>}
                            {nameExisted && <p className={styles["error-text"]}>当前菜品名称已经*存在*</p>}
                        </div>
                        <div className={despClasses}>
                            <label htmlFor="description">菜品介绍</label>
                            <textarea type="text" name="description" id="description" className={despClasses}
                                      value={despValue}
                                      onChange={despValueChangeHandler} onBlur={despValueBlurHandler} rows="5"
                                      cols="42"
                                      placeholder="可写一些主要食材，烹饪方法，过敏源等"/>
                            {despHasError && <p className={styles["error-text"]}>其提供当前菜品介绍</p>}
                        </div>
                        <div className={priceClasses}>
                            <label htmlFor="price">定价</label>
                            <input type="text" name="price" id="price" className={priceClasses}
                                   value={priceValue}
                                   onChange={priceValueChangeHandler} onBlur={priceValueBlurHandler}/>
                            {priceHasError && <p className={styles["error-text"]}>其提供当前菜品价格(有效价格不可小于0)</p>}
                        </div>
                        <div className={styles['form-actions']}>
                            <button type="button" onClick={cancel}>取消</button>
                            <button type="button" onClick={reset}>重置</button>
                            <button type="submit" disabled={cannotSubmit}>提交</button>
                        </div>
                    </div>
                </form>
            </Card>
        </section>
    );
};

export default AddMealForm;