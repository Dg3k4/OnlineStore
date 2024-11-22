import React, {useContext} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import {DEVICE_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {deleteBasketItem} from "../http/basketAPI";
import {Context} from "../index";

const BasketItem = ({item}) => {
    const {basket} = useContext(Context)
    const history = useNavigate()
    const deleteItem = async () => {
        try {
            await deleteBasketItem(item.device.id);
            basket.deleteBasketDevice(item.id)
        } catch (e) {
            alert("Не удалось удалить товар")
        }
    }

    return (
        <Col className="mt-3 d-flex flex-column align-items-center" md={3}>
            <Card onClick={() => history(DEVICE_ROUTE + "/" + item.device.id)} style={{cursor: "pointer"}} className="d-flex w-100 gap-3align-items-center p-3">
                <Image style={{borderRadius: 5}} width={180} height={180} src={process.env.REACT_APP_API_URL + item.device.img}/>
                <div className="mt-3 d-flex justify-content-between">
                    <div style={{fontWeight: "bold"}}>
                        {item.device.name}
                    </div>
                    <div>Рейтинг: {item.device.rating}</div>
                </div>
                <div>От: {item.device.price} руб.</div>
            </Card>
            <Button
                className="mt-2 align-self-start"
                variant={"outline-danger"}
                onClick={() => deleteItem(item.id)}
            >
                Удалить
            </Button>
        </Col>
    );
};

export default BasketItem;