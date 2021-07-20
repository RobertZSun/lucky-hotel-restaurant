import styles from './MealsSection.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const MealsSection = (props) => {
    const cuisineSection = props.content;
    const cuisine = cuisineSection.cuisine;
    const dishes = cuisineSection.dishes;

    const mealsList = Object.keys(dishes).map(mealId => <MealItem key={mealId}
                                                                  id={mealId}
                                                                  name={dishes[mealId].name}
                                                                  description={dishes[mealId].description}
                                                                  price={dishes[mealId].price}/>);

    return <section className={styles.meals}>
        <div className={styles.cuisine}>{cuisine}</div>
        <Card>
            <ul>{mealsList}</ul>
        </Card>
    </section>;
};

export default MealsSection;