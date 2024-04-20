import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer";
import customerProductReducer from "./customer/product/Reducer";
import cartReducer from "./customer/cart/Reducer";
import orderReducer from "./customer/order/Reducer";
import reviewReducer from "./customer/review/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    customerProduct: customerProductReducer,
    cart: cartReducer,
    order: orderReducer,
    review: reviewReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));