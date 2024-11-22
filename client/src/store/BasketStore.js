import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._items = []
        makeAutoObservable(this)
    }

    setDevice(items) {
        this._items = items
    }
    addBasketDevice(device) {
        this._items.push(device)
    }
    deleteBasketDevice(deviceId) {
        this._items = this._items.filter(device => device.id !== deviceId)
    }

    get items111() {
        return this._items
    }
}