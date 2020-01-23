import Axios from "axios";

const baseUrl = 'http://localhost:4040/api/';
const productsUri = 'products/';

export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const getProducts = () => {
    return (dispatch, getState) => {
        Axios.get(baseUrl + productsUri).then((response)=>{
            dispatch(updateProducts(response.data));
        })
    }
}

const updateProducts = (products) => {
    return {
        type: UPDATE_PRODUCTS,
        products: products
    };
}
