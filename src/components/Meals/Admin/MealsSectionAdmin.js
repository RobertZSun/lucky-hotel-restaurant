import styles from './MealsSectionAdmin.module.css';
import MealItemWithDelBtn from "./MealItemWithDelBtn";
import Card from "../../UI/Card";
import {delDish} from "../../../utility_funcs/meal_related";

const MealsSectionAdmin = (props) => {

    const cuisineSectionId = props.id;
    const cuisineSection = props.content;
    const cuisine = cuisineSection.cuisine;
    const dishes = cuisineSection.dishes;

    async function delCurrentDish(dishId) {
        await delDish(cuisineSectionId, dishId);
    }



    const mealsList = Object.keys(dishes).map(mealId => <MealItemWithDelBtn key={mealId}
                                                                            id={mealId}
                                                                            name={dishes[mealId].name}
                                                                            description={dishes[mealId].description}
                                                                            price={dishes[mealId].price}
                                                                            del={delCurrentDish}/>);

    return <section className={styles.meals}>
        <div className={styles.cuisine}>{cuisine}</div>
        <Card>
            <ul>{mealsList}</ul>
        </Card>
    </section>;
};

export default MealsSectionAdmin;