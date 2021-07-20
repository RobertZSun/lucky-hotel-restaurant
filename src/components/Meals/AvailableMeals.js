import styles from './AvailableMeals.module.css';
import React, {Fragment, useEffect, useState} from "react";
import MealsSection from "./MealsSection";
import Card from "../UI/Card";

const AvailableMeals = () => {
    const [allMealsSections, setAllMealsSections] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const urlToFetch = 'https://lucky-hotel-default-rtdb.asia-southeast1.firebasedatabase.app/allMeals.json';
        const fetchAllMeals = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(urlToFetch);
                if (!response.ok) {
                    throw new Error("获取菜系及菜品过程中失败！");
                }
                const allMeals = await response.json();
                setAllMealsSections(allMeals);
            } catch (e) {
                setError("获取菜系及菜品失败：" + e.message);
            }
            setIsLoading(false);
        };

        fetchAllMeals();
    }, []);


    const mealsList = Object.keys(allMealsSections).map(sectionId =>
        <MealsSection key={sectionId} id={sectionId} content={allMealsSections[sectionId]}/>);


    return (
        <Fragment>
            {!isLoading && mealsList}
            {isLoading && <section className={styles['meals-loading']}><Card><p>菜单获取中...</p></Card></section>}
            {error && <section className={styles['error']}><Card><p>{error}</p></Card></section>}
        </Fragment>
    );
};

export default React.memo(AvailableMeals);