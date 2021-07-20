import {Layout} from 'element-react';
import 'element-theme-default';
import {useContext, useEffect} from "react";
import GroupOrders from "./GroupOrders";
import {getAllOrders} from '../../../utility_funcs/order_related.js';
import HeaderCheckboxes from "./HeaderCheckboxes";
import SidebarNavMenu from "./SidebarNavMenu";
import OrderContext from "../../../store/order-context";


const OrdersLayout = () => {
    const ordersCtx = useContext(OrderContext);
    const {setAllOrders} = ordersCtx;

    useEffect(() => {
        async function init() {
            const response = await getAllOrders();
            setAllOrders(response);
        }

        init();
    }, [setAllOrders]);

    // let arr = {};


    return (
        <Layout.Row>
            <Layout.Col span="3" offset="5">
                <SidebarNavMenu/>
            </Layout.Col>
            <Layout.Col span="11" offset="1">
                <HeaderCheckboxes/>
                <GroupOrders/>
            </Layout.Col>
        </Layout.Row>

    );
};


export default OrdersLayout;