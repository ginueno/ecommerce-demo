import axios from "axios";
import { API_BASE_URL, api } from "../../../config/appConfig";
import { FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_FAILURE, FIND_PRODUCT_FOR_HOME_CATEGORY_FAILURE, FIND_PRODUCT_FOR_HOME_CATEGORY_REQUEST, FIND_PRODUCT_FOR_HOME_CATEGORY_SUCCESS, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS } from "./ActionType";

const findProductsRequest = () => ({ type: FIND_PRODUCT_REQUEST })
const findProductsSuccess = (data) => ({ type: FIND_PRODUCT_SUCCESS, payload: data })
const findProductsFailure = (message) => ({ type: FIND_PRODUCT_FAILURE, payload: message })

export const findProducts = (reqData) => async (dispatch) => {
    try {
        const { name, size, color, category, collection, lpage, pageNumber, sort } = reqData;
        dispatch(findProductsRequest())
        const response = await axios.get(`${API_BASE_URL}/products/?name=${name}&sizes=${size}&colors=${color}&category=${category}&collection=${collection}&lpage=${lpage}&pageNumber=${pageNumber}&sort=${sort}`);
        console.log('Full response:', response); // Log the entire response object
        if (response && response.data) {
            console.log("get products ", response.data);
            dispatch(findProductsSuccess(response.data));
        } else {
            console.error('No data returned from the API');
            dispatch(findProductsFailure('No data returned from the API'));
        }
    } catch (error) {
        dispatch(findProductsFailure(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}

const findProductsByIdRequest = () => ({ type: FIND_PRODUCT_BY_ID_REQUEST })
const findProductsByIdSuccess = (data) => ({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data })
const findProductsByIdFailure = (message) => ({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: message })

export const findProductsById = (reqData) => async (dispatch) => {
    dispatch(findProductsByIdRequest())
    try {
        const { data } = await axios.get(`${API_BASE_URL}/products/id/${reqData.productId}`)
        console.log("get product by id ", data);
        dispatch(findProductsByIdSuccess(data))
    } catch (error) {
        dispatch(findProductsByIdFailure(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}

const findProductsForHomeRequest = () => ({ type: FIND_PRODUCT_FOR_HOME_CATEGORY_REQUEST })
const findProductsForHomeSuccess = (data) => ({ type: FIND_PRODUCT_FOR_HOME_CATEGORY_SUCCESS, payload: data })
const findProductsForHomeFailure = (message) => ({ type: FIND_PRODUCT_FOR_HOME_CATEGORY_FAILURE, payload: message })

export const findProductsForHome = (reqData) => async (dispatch) => {
    try {
        const { category, collection, lpage, sort } = reqData;
        dispatch(findProductsForHomeRequest())
        const response = await axios.get(`${API_BASE_URL}/products/?name=&sizes=&colors=&category=${category}&collection=${collection}&lpage=${lpage}&pageNumber=${1}&sort=${sort}`);
        console.log('Full response:', response); // Log the entire response object
        if (response && response.data) {
            console.log("get products ", response.data);
            let a = category || collection || lpage || sort || null;
            dispatch(findProductsForHomeSuccess({ identifier: a, products: response.data.content }));
        } else {
            console.error('No data returned from the API');
            dispatch(findProductsForHomeFailure('No data returned from the API'));
        }
    } catch (error) {
        dispatch(findProductsFailure(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}