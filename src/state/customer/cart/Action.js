import axios from "axios";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType";
import { API_BASE_URL, api } from "../../../config/appConfig";

const addItemToCartRequest = () => ({ type: ADD_ITEM_TO_CART_REQUEST })
const addItemToCartSuccess = (data) => ({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data })
const addItemToCartFailure = (error) => ({ type: ADD_ITEM_TO_CART_FAILURE, payload: error })

export const addItemToCart = (reqData) => async (dispatch) => {
    console.log("req data ", reqData)
    try {
        dispatch(addItemToCartRequest());
        const config = {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`,
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.put(`${API_BASE_URL}/api/cart/add`, reqData.data, config)

        console.log("added item to cart ", data)
        dispatch(addItemToCartSuccess(data))
    } catch (error) {
        dispatch(addItemToCartFailure(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message))
    }
}

const getCartRequest = () => ({ type: GET_CART_REQUEST })
const getCartSuccess = (data) => ({ type: GET_CART_SUCCESS, payload: data })
const getCartFailure = (error) => ({ type: GET_CART_FAILURE, payload: error })

export const getCart = (jwt) => async (dispatch) => {
    try {
        dispatch(getCartRequest())
        const { data } = await api.get(`/api/cart/user`)
        console.log("get cart ", data)
        dispatch(getCartSuccess(data))
    } catch (error) {
        dispatch(getCartFailure(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        ))
    }
}

const removeCartItemRequest = () => ({ type: REMOVE_CART_ITEM_REQUEST })
const removeCartItemSuccess = (data) => ({ type: REMOVE_CART_ITEM_SUCCESS, payload: data })
const removeCartItemFailure = (error) => ({ type: REMOVE_CART_ITEM_FAILURE, payload: error })

export const removeCartItem = (reqData) => async (dispatch) => {
    try {
        dispatch(removeCartItemRequest());
        await api.delete(`/api/cart_item/${reqData.cartItemId}`)
        localStorage.setItem("openSnack", true)
        dispatch(removeCartItemSuccess(reqData.cartItemId))
    } catch (error) {
        dispatch(removeCartItemFailure(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        ))
    }
}

const updateCartItemRequest = () => ({ type: UPDATE_CART_ITEM_REQUEST })
const updateCartItemSuccess = (data) => ({ type: UPDATE_CART_ITEM_SUCCESS, payload: data })
const updateCartItemFailure = (error) => ({ type: UPDATE_CART_ITEM_FAILURE, payload: error })

export const updateCartItem = (reqData) => async (dispatch) => {
    try {
        dispatch(updateCartItemRequest());
        const { data } = await api.put(`/api/cart_item/${reqData.cartItemId}`, reqData.data)
        console.log("updated cart item ", data)
        dispatch(updateCartItemSuccess(data))
    } catch (error) {
        dispatch(updateCartItemFailure(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        ))
    }
}