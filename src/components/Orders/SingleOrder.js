import styles from './SingleOrder.module.css';
import {Button, Card, Table} from "element-react";
import {useState} from "react";

const columns = [
    {
        label: "菜品名称",
        prop: "name",
        width: 425,
        align: "left"
    },
    {
        label: "数量",
        prop: "amount",
        // width: 50
        width: 70,
        align: "center"
    },
    {
        label: "单价",
        prop: "price",
        width: 70,
        align: "center"
    }
];
const SingleOrder = (props) => {
    const [isCompleted, setIsCompleted] = useState(false);

    const markOrder = () => {
        setIsCompleted(prev=> !prev);
    };

    const orderedDishes = (
        <Table
            style={{width: '100%'}}
            columns={columns}
            data={props.dishes}
            stripe={true}
        />);

    const btnType = isCompleted ? "success" : "info";
    const btnText = isCompleted ? "已完成!" : "标记已完成";
    return (<Card
                className={styles["box-card"]}
                key={props.id}
                header={
                    <div className="clearfix">
                        <div>
                            <span style={{"lineHeight": "36px"}}>姓名：{props.name}</span>
                            <span style={{"float": "right"}}>
                            <Button type={btnType} onClick={markOrder}>{btnText}</Button>
                        </span>
                        </div>
                        <div>
                            <span style={{"lineHeight": "36px"}}>电话：{props.phone}</span>
                            <span style={{"lineHeight": "36px", "float": "right"}}>订单号：{props.id}</span>
                        </div>
                        <div>
                        </div>
                        <div>
                            <span style={{"lineHeight": "36px"}}>地址：{props.address}</span>
                        </div>
                        <div>
                            <span style={{"lineHeight": "36px"}}>金额：{props.amount}</span>
                            <span style={{"float": "right"}}>【下单时间】 {props.timeID}</span>
                        </div>
                        {props.note && <div>
                            <span style={{"lineHeight": "36px"}}>备注：{props.note}</span>
                        </div>}
                    </div>}>
                {orderedDishes}
            </Card>
    );
};

export default SingleOrder;