import { CANCEL_ORDER_FAILURE, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_HISTORY_FAILURE, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, PLACE_ORDER_FAILURE, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "./ActionType"

const initialState = {
    orders: [],
    order: null,
    error: null,
    loading: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { ...state, loading: true }
        case CREATE_ORDER_SUCCESS:
            return { ...state, loading: false, order: action.payload }
        case CREATE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case GET_ORDER_BY_ID_REQUEST:
            return { ...state, order: null, loading: true }
        case GET_ORDER_BY_ID_SUCCESS:
            return { ...state, order: action.payload, loading: false }
        case GET_ORDER_BY_ID_FAILURE:
            return { ...state, error: action.payload, loading: false }
        case GET_ORDER_HISTORY_REQUEST:
            return { ...state, orders: [], loading: true }
        case GET_ORDER_HISTORY_SUCCESS:
            return { ...state, orders: action.payload, loading: true }
        case GET_ORDER_HISTORY_FAILURE:
            return { ...state, error: action.payload, loading: true }
        case PLACE_ORDER_REQUEST:
            return { ...state, order: null, loading: true }
        case PLACE_ORDER_SUCCESS:
            return { ...state, order: action.payload, loading: false }
        case PLACE_ORDER_FAILURE:
            return { ...state, error: action.payload, loading: false }
        case CANCEL_ORDER_REQUEST:
        case CANCEL_ORDER_SUCCESS:
            return { 
                ...state, orders: state.orders.filter(
                    (item) => item.id != action.payload
                ),
                loading: false
            }
        case CANCEL_ORDER_FAILURE:
            return { ...state, error: action.payload, loading: false }
        default:
            return state
    }
}

export default orderReducer