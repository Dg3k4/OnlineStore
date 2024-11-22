import React, {useContext, useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button, Card, Col, Image, Row, Toast} from "react-bootstrap";
import bigStar from "../assets/big_star.png";
import {useParams} from "react-router-dom"
import {fetchOneDevice} from "../http/deviceAPI";
import {Context} from "../index";
import {createBasketItem, fetchBasket} from "../http/basketAPI";
import Notification from "../components/Notification";
import { v4 as uuidv4 } from 'uuid';
import SetRating from "../components/SetRating";

const DevicePage = () => {
    const [device, setDevice] = useState({info:[]})
    const [notifications, setNotifications] = useState([])
    const {id} = useParams()
    const {basket} = useContext(Context)

    const addToCart = async () => {
        try {
            await createBasketItem(device.id)
            setNotifications(prev => [
                ...prev,
                {id: uuidv4(), message: "Товар добавлен в корзину!"}
            ]);
        } catch (e) {
            alert("Не удалось добавить товар в корзину")
        }
    }

    const removeNotification = (id) => {
        setNotifications(notifications => notifications.filter(notification => notification.id !== id));
    };

    const fetchAndSetDevice = async () => {
        const data = await fetchOneDevice(id);
        setDevice(data);
    };

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}></Image>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 style={{textAlign: "center"}}>{device.name}</h2>
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 260, height: 250, backgroundSize: "cover", fontSize: 70}}
                            onClick={() => 1}
                        >
                            {device.rating}
                        </div>
                        <SetRating deviceId={id} fetchAndSetDevice={fetchAndSetDevice} setNotifications={setNotifications}/>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column gap-3 align-items-center justify-content-around"
                        style={{width: 300, height: 300, border: "2px solid lightgray"}}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button
                            variant={"outline-dark"}
                            onClick={() => addToCart(device.id)}
                        >
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? "lightgray" : "transparent", padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
            <Notification
                notifications={notifications}
                removeNotification={removeNotification}
            />
        </Container>
    );
};

export default DevicePage;