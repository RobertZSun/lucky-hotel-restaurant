import React, {useCallback, useReducer} from 'react';
import {getOrdersByYMDate} from "../utility_funcs/order_related";

const OrderContext = React.createContext({
    allOrders: {},
    selectedDay: null,
    filteredOrders: {},
    ordersOfThatDay: {},
    setTheDay: (date) => {
    },
    setAllOrders: (orders) => {
    },
    setOrdersOfThatDay: (orders) => {
    },
    setFilteredOrders: (orders) => {
    },
});

const defaultOrderState = {
    selectedDay: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`,
    allOrders: {},
    filteredOrders: {},
    ordersOfThatDay: {},
};

const orderReducer = (state, action) => {
    switch (action.type) {
        case "SET_THE_DAY":
            return {...state, selectedDay: action.payload.day, ordersOfThatDay: action.payload.data};
        case "SET_ORDERS_OF_THAT_DAY":
            return {...state, ordersOfThatDay: action.payload};
        case "SET_ALL_ORDERS":
            return {...state, allOrders: action.payload};
        case "SET_FILTERED_ORDERS":
            return {...state, filteredOrders: action.payload};
        default:
            return defaultOrderState;
    }
};

// ********************************** Provider Component ***********************************************************

const OrderProvider = React.memo((props) => {

    const [orderState, dispatchOrderAction] = useReducer(orderReducer, defaultOrderState);

    const setTheDayHandler = useCallback(async (day) => {
        const data = await getOrdersByYMDate(day);
        dispatchOrderAction({type: "SET_THE_DAY", payload: {day, data}});
    }, []);
    const setAllOrdersHandler = useCallback((orders) => {
        dispatchOrderAction({type: "SET_ALL_ORDERS", payload: orders});
    }, []);
    const setOrderOfThatDayHandler = useCallback((orders) => {
        dispatchOrderAction({type: "SET_ORDERS_OF_THAT_DAY", payload: orders});
    }, []);
    const setFilteredOrdersHandler = useCallback((orders) => {
        dispatchOrderAction({type: "SET_FILTERED_ORDERS", payload: orders});
    }, []);

    const contextValue = {
        selectedDay: orderState.selectedDay,
        setTheDay: setTheDayHandler,
        allOrders: orderState.allOrders,
        setAllOrders: setAllOrdersHandler,
        ordersOfThatDay: orderState.ordersOfThatDay,
        setOrdersOfThatDay: setOrderOfThatDayHandler,
        filteredOrders: orderState.filteredOrders,
        setFilteredOrders: setFilteredOrdersHandler,
    };


    return (
        <OrderContext.Provider value={contextValue}>
            {props.children}
        </OrderContext.Provider>
    );
});

export {OrderProvider};
export default OrderContext;
