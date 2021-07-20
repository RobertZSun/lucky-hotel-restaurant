import styles from "./Modal.module.css";
import {Fragment} from 'react';
import ReactDOM from 'react-dom';

const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = props => {
    return <div className={styles.modal}>
        {props.children}
    </div>;
};

const placeToBePortal = document.getElementById("overlays");

const Modal = props => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, placeToBePortal)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, placeToBePortal)}
        </Fragment>
    );
};

export default Modal;