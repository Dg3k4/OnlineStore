import {$authHost, $host} from "./index";

export const fetchBasket = async () => {
    const {data} = await $authHost.get(`api/user/basket/`)
    return data
}

export const createBasketItem = async (deviceId) => {
    const {data} = await $authHost.post(`api/user/basket/${deviceId}`)
    return data
}

export const deleteBasketItem = async (deviceId) => {
    const {data} = await $authHost.delete(`api/user/basket/item/${deviceId}`)
    return data
}