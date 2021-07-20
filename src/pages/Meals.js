import {Fragment} from "react";
import AvailableMeals from "../components/Meals/AvailableMeals";
import MealsSummary from "../components/Meals/MealsSummary";


const Meals = () => {
    return (
        <Fragment>
            <MealsSummary/>
            <AvailableMeals/>
        </Fragment>);
};
export default Meals;