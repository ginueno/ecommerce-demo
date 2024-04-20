import axios from "axios";
import { CANCEL_ORDER_FAILURE, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_HISTORY_FAILURE, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, PLACE_ORDER_FAILURE, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "./ActionType";
import { API_BASE_URL, api } from "../../../config/appConfig";
import { getCart } from "../cart/Action";

const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST })
const createOrderSuccess = (data) => ({ type: CREATE_ORDER_SUCCESS, payload: data })
const createOrderFailure = (error) => ({ type: CREATE_ORDER_FAILURE, payload: error })

export const createOrder = (reqData) => async (dispatch) => {
    console.log("req data ", reqData)
    try {
        dispatch(createOrderRequest())
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${reqData.jwt}`,
            },
        };

        const { data } = await axios.post(`${API_BASE_URL}/api/orders/`, reqData.address, config)

        if (data.id) {
            reqData.navigate({ search: `step=3&order_id=${data.id}` })
        }

        console.log("created order ", data);
        dispatch(createOrderSuccess(data))

    } catch (error) {
        console.log("catch error ", error)
        dispatch(createOrderFailure(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        ))
    }
}

const getOrderByIdRequest = () => ({ type: GET_ORDER_BY_ID_REQUEST })
const getOrderByIdSuccess = (data) => ({ type: GET_ORDER_BY_ID_SUCCESS, payload: data })
const getOrderByIdFailure = (error) => ({ type: GET_ORDER_BY_ID_FAILURE, payload: error })

export const getOrderById = (orderId) => async (dispatch) => {
    console.log("get order by id ", orderId)
    try {
        dispatch(getOrderByIdRequest())
        const { data } = await api.get(`/api/orders/${orderId}`)
        console.log("order by id ", data)
        dispatch(getOrderByIdSuccess(data))
    } catch (error) {
        console.log("catch error ", error)
        dispatch(getOrderByIdFailure(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        ))
    }
}

const getOrderHistoryRequest = () => ({ type: GET_ORDER_HISTORY_REQUEST })
const getOrderHistorySuccess = (data) => ({ type: GET_ORDER_HISTORY_SUCCESS, payload: data })
const getOrderHistoryFailure = (error) => ({ type: GET_ORDER_HISTORY_FAILURE, payload: error })

export const getOrderHistory = (reqData) => async (dispatch) => {
    try {
        dispatch(getOrderHistoryRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`,
            },
        };
        const { data } = await api.get(`/api/orders/user`)
        console.log("order history ", data)
        dispatch(getOrderHistorySuccess(data))
    } catch (error) {
        console.log("catch error ", error)
        dispatch(getOrderHistoryFailure(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        ))
    }
}

const placeOrderRequest = () => ({ type: PLACE_ORDER_REQUEST })
const placeOrderSuccess = (data) => ({ type: PLACE_ORDER_SUCCESS, payload: data })
const placeOrderFailure = (message) => ({ type: PLACE_ORDER_FAILURE, payload: message })

export const placeOrder = (orderId) => async (dispatch) => {
    console.log("palce order id ", orderId)
    try {
        dispatch(placeOrderRequest())
        const { data } = await api.put(`/api/orders/place/${orderId}`)
        console.log("place order ", data)
        dispatch(placeOrderSuccess(data))
    } catch (error) {
        console.log("catch error ", error)
        dispatch(placeOrderFailure(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        ))
    }
}

const cancelOrderRequest = () => ({ type: CANCEL_ORDER_REQUEST })
const cancelOrderSuccess = (data) => ({ type: CANCEL_ORDER_SUCCESS, payload: data })
const cancelOrderFailure = (message) => ({ type: CANCEL_ORDER_FAILURE, payload: message })

export const cancelOrder = (orderId) => async (dispatch) => {
    console.log("palce order id ", orderId)
    try {
        dispatch(cancelOrderRequest())
        const { data } = await api.put(`/api/orders/cancel/${orderId}`)
        console.log("place order ", data)
        dispatch(cancelOrderSuccess(orderId))
    } catch (error) {
        console.log("catch error ", error)
        dispatch(cancelOrderFailure(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        ))
    }
}