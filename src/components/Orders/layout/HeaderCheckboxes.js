import styles from './HeaderCheckboxes.module.css';
import { useContext, useEffect, useState} from "react";
import {Checkbox, Card} from 'element-react';
import OrderContext from "../../../store/order-context";
import {getOrdersByYMDate, getOrdersByYMDHour} from "../../../utility_funcs/order_related";

const HeaderCheckboxes = () => {

    const ordersCtx = useContext(OrderContext);
    const {
        selectedDay,
        ordersOfThatDay,
        setFilteredOrders,
        setOrdersOfThatDay
    } = ordersCtx;

    const [checkBox, setCheckBox] = useState({
        // checkAll: false,
        hours: [],
        checkedHours: [],
        // isIndeterminate: true,
    });

    useEffect(() => {
        async function init() {
            const response = await getOrdersByYMDate(selectedDay);
            const hourNow = new Date().getHours();
            // const hours = Object.keys(response);
            const hours = Object.keys(response);
            const selected = hours.includes(hourNow.toString()) ? [`${hourNow}`] :[];
            setCheckBox({
                hours: hours,
                checkedHours: selected,
            });
            const ordersInHour = await getOrdersByYMDHour(selectedDay + "/" + hourNow);
            setFilteredOrders(ordersInHour);
            setOrdersOfThatDay(response);
        }

        init();
    }, [selectedDay, setCheckBox, setFilteredOrders, setOrdersOfThatDay]);


    function handleCheckedHoursChange(value) {
        setFilteredOrdersHandler(value);
        setCheckBox((prevState) => ({
                ...prevState,
                checkedHours: value,
            })
        );
    }

    const setFilteredOrdersHandler = (arrayValues) => {
        if (arrayValues.length === 0) {
            setFilteredOrders(null);
            return;
        }
        const filteredOrders = {};
        arrayValues.forEach(hour => {
            const hourOrders = ordersOfThatDay[hour];
            Object.assign(filteredOrders, hourOrders);
        });
        setFilteredOrders(filteredOrders);
    };


    return <Card className={styles['checkbox-container']}>
        <Checkbox.Group
            value={checkBox.checkedHours}
            onChange={handleCheckedHoursChange}>
            {
                checkBox.hours.map((hour, index) =>
                    <Checkbox key={`${index}`} label={hour}>{`${hour}点`}</Checkbox>
                )
            }
        </Checkbox.Group>
    </Card>;
};

export default HeaderCheckboxes;