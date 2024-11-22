import React, {useState} from 'react';
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { rating, deleteRating } from "../http/userAPI";
import { v4 as uuidv4 } from 'uuid';

const SetRating = ({ deviceId, fetchAndSetDevice, setNotifications }) => {

    const setRating = async (rate) => {
        try {
            if (rate) {
                await deleteRating(deviceId);
            }
            const response = await rating(deviceId, rate);
            fetchAndSetDevice()
            setNotifications(prev => [
                ...prev,
                {id: uuidv4(), message: "Оценка поставлена"}
            ]);
        } catch (e) {
            alert("Не удалось поставить оценку")
        }
    }
    const removeRating = async () => {
        try {
            const response = await deleteRating(deviceId);
            fetchAndSetDevice()
            setNotifications(prev => [
                ...prev,
                {id: uuidv4(), message: "Оценка удалена"}
            ]);
        } catch (e) {
            alert("Не удалось удалить оценку")
        }
    }

    return (
        <Container className="p-1 d-flex gap-1 justify-content-center mt-3">
            {[...Array(10)].map((a, i) =>
                <Button
                    key={i} // Adding a key for each button
                    variant={"outline-warning"}
                    onClick={() => setRating(i + 1)}
                >
                    {i + 1}
                </Button>
            )}
            <Button onClick={() => removeRating()} variant={"outline-danger"}>
                Убрать рейтинг
            </Button>
        </Container>
    );
};

export default SetRating;