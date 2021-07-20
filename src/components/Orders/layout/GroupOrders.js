import styles from './GroupOrders.module.css';
import {Collapse} from "element-react";
import SingleOrder from "../SingleOrder";
import {useContext} from "react";
import OrderContext from "../../../store/order-context";
import Card from "../../UI/Card";

const GroupOrders = () => {

    const ordersCtx = useContext(OrderContext);
    const {filteredOrders: ordersInfo} = ordersCtx;

    if (!ordersInfo) {
        const noOrders = <div className={styles.container}><Card>
            <div className={styles['inner-box']}>你最近没有订单</div>
        </Card></div>;
        return noOrders;
    }
    const orderIds = Object.keys(ordersInfo);


    const ordersList = orderIds.map((orderID) => (
        <Collapse.Item title={orderID + " --- Tel: " + ordersInfo[orderID].phone + " --- [时间]: " + ordersInfo[orderID].timeID }
                       name={orderID}
                       key={orderID}>
            <SingleOrder id={orderID}
                         timeID={ordersInfo[orderID].timeID}
                         key={orderID}
                         name={ordersInfo[orderID].name}
                         phone={ordersInfo[orderID].phone}
                         address={ordersInfo[orderID].address}
                         amount={ordersInfo[orderID].totalAmount}
                         dishes={ordersInfo[orderID].dishes}
                         note={orderID.note}/>
        </Collapse.Item>));
    return (
        <Collapse>
            {ordersList}
        </Collapse>
    );
};

export default GroupOrders;