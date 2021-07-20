import OrdersLayout from "../components/Orders/layout/OrdersLayout";
import {OrderProvider} from "../store/order-context";
const MyOrders = () => {
    return (<OrderProvider><OrdersLayout/></OrderProvider>);
};

export default MyOrders;

