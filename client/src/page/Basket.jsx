import React, {useContext, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import BasketList from "../components/BasketList";
import {Context} from "../index";
import {fetchBasket} from "../http/basketAPI";

const Basket = () => {
    const {basket} = useContext(Context)

    useEffect(() => {
        fetchBasket().then(data => basket.setDevice(data))
    }, [])

    return (
        <Container>
            <Row>
                <BasketList/>
            </Row>
        </Container>
    );
};

export default Basket;