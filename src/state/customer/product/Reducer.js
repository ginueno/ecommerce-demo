import { FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_FAILURE, FIND_PRODUCT_FOR_HOME_CATEGORY_FAILURE, FIND_PRODUCT_FOR_HOME_CATEGORY_REQUEST, FIND_PRODUCT_FOR_HOME_CATEGORY_SUCCESS, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS } from "./ActionType"

const initialState = {
    products: [],
    productsHome: {},
    product: null,
    loading: false,
    error: null
}

const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null, products: [] };
        case FIND_PRODUCT_SUCCESS:
            return { ...state, products: action.payload, loading: false };
        case FIND_PRODUCT_FAILURE:
            return { ...state, loading: false, products: [], error: action.payload };
        case FIND_PRODUCT_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, product: action.payload };
        case FIND_PRODUCT_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FIND_PRODUCT_FOR_HOME_CATEGORY_REQUEST:
            return { ...state, loading: true, error: null };
        case FIND_PRODUCT_FOR_HOME_CATEGORY_SUCCESS:
            return {
                ...state,
                productsHome: {
                    ...state.productsHome,
                    [action.payload.identifier]: action.payload.products,
                },
                loading: false,
            };
        case FIND_PRODUCT_FOR_HOME_CATEGORY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default customerProductReducer;