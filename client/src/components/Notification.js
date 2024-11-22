import React, {useEffect, useState} from 'react';
import {Toast, ToastContainer} from "react-bootstrap";
import styles from "../style/notificationAnimation.module.css"

const ToastMessage = ({id, message, onClose}) => {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (closing) {
            onClose(id);
        }
    }, [closing, onClose, id]);

    return (
        <Toast onClose={() => setClosing(true)} delay={10000} autohide className={`${styles["toast-fade-in"]}`}>
            <Toast.Header style={{display: "flex", justifyContent: "space-between", fontWeight: "bold"}}>Уведомление</Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    )
}

const Notification = ({notifications, removeNotification}) => (
    <ToastContainer
        position={"bottom-end"}
        className="w-100 d-flex flex-column align-items-end p-3"
        style={{boxSizing: "border-box", overflowX: "hidden"}}
    >
        {notifications.map((notification) =>
            <ToastMessage
                key={notification.id}
                id={notification.id}
                message={notification.message}
                onClose={removeNotification}
            />
        )}
    </ToastContainer>
);

export default Notification;