import styles from './MealsSummary.module.css'

const MealsSummary = () => {
    return (
        <section className={styles.summary}>
            <h2>美味餐食，快送到家，点餐就来好运来！</h2>
            <p>选择属于您的美味佳肴，本店提供丰富的菜品选择，让您和家人一起吃得放心，吃的开心！</p>
            <p>本店食材全部采用当日农贸市场采购的新鲜蔬菜，肉。新鲜的食材加上高超的烹饪手艺，给您呈现色香味俱全的佳肴！</p>
        </section>
    );
}

export default MealsSummary;