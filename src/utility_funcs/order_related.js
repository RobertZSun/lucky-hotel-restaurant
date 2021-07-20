import axios from 'axios';

async function getAllOrders() {
    let allYearsData;
    const urlToFetch = "https://lucky-hotel-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json";
    try {
        const response = await axios.get(urlToFetch);
        if (response.status !== 200) {
            throw new Error("请求所有年份订单失败！");
        }
        allYearsData = response.data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
    return Promise.resolve(allYearsData);
}


async function getOrdersByYear(year) {
    let yearData;

    const urlToFetch = `https://lucky-hotel-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${year}.json`;
    try {
        const response = await axios.get(urlToFetch);
        if (response.status !== 200) {
            throw new Error(`请求${year}年订单失败！`);
        }
        yearData = response.data;
        if (Array.isArray(yearData)) {
            const temp = {};
            for (let i = 0; i < yearData.length; i++) {
                if (yearData[i] === null) {
                    continue;
                } else {
                    temp[i] = yearData[i];
                }
            }
            yearData = {...temp};
        }
        // console.log(yearData);
    } catch (error) {
        console.error(error);
    }
    return Promise.resolve(yearData);
}


async function getOrdersByYMDate(time) {
    let yearAndMonthAndDateData;

    const urlToFetch = `https://lucky-hotel-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${time}.json`;
    try {
        const response = await axios.get(urlToFetch);
        if (response.status !== 200) {
            throw new Error(`请求${time}(年/月/日)订单失败！`);
        }
        yearAndMonthAndDateData = response.data;
        if (Array.isArray(yearAndMonthAndDateData)) {
            const temp = {};
            for (let i = 0; i < yearAndMonthAndDateData.length; i++) {
                if (yearAndMonthAndDateData[i] === null) {
                    continue;
                } else {
                    temp[i.toString()] = yearAndMonthAndDateData[i];
                }
            }
            yearAndMonthAndDateData = {...temp};
        }
        // console.log(yearAndMonthAndDateData);
    } catch (error) {
        console.error(error);
    }
    return Promise.resolve(yearAndMonthAndDateData);
}

async function getOrdersByYMDHour(time) {
    let yearAndMonthAndDateAndHourData;

    const urlToFetch = `https://lucky-hotel-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${time}.json`;
    try {
        const response = await axios.get(urlToFetch);
        if (response.status !== 200) {
            throw new Error(`请求${time}(年/月/日)订单失败！`);
        }
        yearAndMonthAndDateAndHourData = response.data;
        // console.log(yearAndMonthAndDateAndHourData);
    } catch (error) {
        console.error(error);
    }
    return Promise.resolve(yearAndMonthAndDateAndHourData);
}



export {
    getAllOrders,
    getOrdersByYear,
    getOrdersByYMDate,
    getOrdersByYMDHour
};