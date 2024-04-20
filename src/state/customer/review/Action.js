import axios from "axios";
import { API_BASE_URL, api } from "../../../config/appConfig";
import { CREATE_RATING_FAILURE, CREATE_RATING_SUCCESS, CREATE_REVIEW_FAILURE, CREATE_REVIEW_SUCCESS, GET_ALL_RATINGS_FAILURE, GET_ALL_RATINGS_SUCCESS, GET_ALL_REVIEWS_FAILURE, GET_ALL_REVIEWS_SUCCESS } from "./ActionType";

const createReviewSuccess = (data) => ({ type: CREATE_REVIEW_SUCCESS, payload: data })
const createReviewFailure = (error) => ({ type: CREATE_REVIEW_FAILURE, payload: error })

export const createReview = (reqData) => {
    console.log("create review req: ", reqData)
    return async (dispatch) => {
        try {
            const response = await api.post('/api/review/create', reqData)
            dispatch(createReviewSuccess(response.data))
            console.log("create review: ", response.data)
        } catch (error) {
            dispatch(createReviewFailure(error.message))
        }
    }
}

const getAllReviewSuccess = (data) => ({ type: GET_ALL_REVIEWS_SUCCESS, payload: data })
const getAllReviewFailure = (error) => ({ type: GET_ALL_REVIEWS_FAILURE, payload: error })

export const getAllReview = (productId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/review/products/${productId}`)
            dispatch(getAllReviewSuccess(response.data))
            console.log("all review ", response.data)
        } catch (error) {
            dispatch(getAllReviewFailure(error.message))
        }
    }
}

const createRatingSuccess = (data) => ({ type: CREATE_RATING_SUCCESS, payload: data })
const createRatingFailure = (error) => ({ type: CREATE_RATING_FAILURE, payload: error })

export const createRating = (reqData) => {
    console.log("create rating req: ", reqData)
    return async (dispatch) => {
        try {
            const response = await api.post('/api/rating/create', reqData)
            dispatch(createRatingSuccess(response.data))
            console.log("create rating: ", response.data)
        } catch (error) {
            dispatch(createRatingFailure(error.message))
        }
    }
}

const getAllRatingSuccess = (data) => ({ type: GET_ALL_RATINGS_SUCCESS, payload: data })
const getAllRatingFailure = (error) => ({ type: GET_ALL_RATINGS_FAILURE, payload: error })

export const getAllRating = (productId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/rating/product/${productId}`)
            dispatch(getAllRatingSuccess(response.data))
            console.log("all rating ", response.data)
        } catch (error) {
            dispatch(getAllRatingFailure(error.message))
        }
    }
}