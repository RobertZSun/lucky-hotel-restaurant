import styles from "./SidebarNavMenu.module.css";
import {Menu} from "element-react";
import {useContext} from "react";
import OrderContext from "../../../store/order-context";

const SidebarNavMenu = (props) => {
    const ordersCtx = useContext(OrderContext);
    const {allOrders: years, selectedDay: defaultDate, setTheDay} = ordersCtx;


    function onSelect(index) {
        setTheDay(index);
    }

    const yearsArray = Object.keys(years);

    const menuList = yearsArray.map(year => {
        let monthsOfTheYear = years[year];
        if (Array.isArray(monthsOfTheYear)) {
            const temp = {};
            for (let i = 0; i < monthsOfTheYear.length; i++) {
                if (monthsOfTheYear[i] === null) {
                    continue;
                } else {
                    temp[i] = monthsOfTheYear[i];
                }
            }
            monthsOfTheYear = {...temp};
        }
        const monthsOfTheYearArray = Object.keys(monthsOfTheYear);
        const monthsList = monthsOfTheYearArray.map(month => {
            let datesOfTheMonth = monthsOfTheYear[month];
            const datesOfTheMonthArray = Object.keys(datesOfTheMonth);
            const daysList = datesOfTheMonthArray.map(date => {
                return <Menu.Item index={`${year}/${month}/${date}`}
                                  key={`${year}-${month}-${date}`}>{date} 日</Menu.Item>;
            });
            return <Menu.ItemGroup title={`${month}月份`} key={`${year}-${month}`}>{daysList}</Menu.ItemGroup>;
        });
        return <Menu.SubMenu index={year} title={`${year} 年`} key={year}>{monthsList}</Menu.SubMenu>;

    });

    return (
        <Menu defaultActive={defaultDate}
              defaultOpeneds={[`${defaultDate.substring(0, 4)}`]}
              uniqueOpened={true}
              className={`el-menu-vertical-demo ${styles['space-at-top']}`}
              onSelect={onSelect}
              theme="light">
            {menuList}
        </Menu>
    );
};

export default SidebarNavMenu;