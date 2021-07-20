import {Fragment} from "react";
import AddMealForm from "../components/AddMeal/AddMealForm";
import MealsAdmin from "../components/Meals/Admin/MealsAdmin";


const AddMealFormWithMenu = () => {
    return (
        <Fragment>
            <AddMealForm />
            <MealsAdmin/>
        </Fragment>);
};
export default AddMealFormWithMenu;