import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Col, Row} from "react-bootstrap";
import {Context} from "../index";
import {fetchBasket} from "../http/basketAPI";
import BasketItem from "./BasketItem";

const BasketList = observer(() => {
    const {basket} = useContext(Context)

    return (
        <Row className="d-flex">
            {basket.items111.map(item =>
                <BasketItem key={item.id} item={item}/>
            )}
        </Row>
    );
});

export default BasketList;