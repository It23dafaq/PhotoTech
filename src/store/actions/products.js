import Axios from "axios";
import FormData from 'form-data';

const baseUrl = 'http://localhost:4040/api/';
const productsUri = 'product';
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const getProducts = () => {
    console.log("inside get products");
    return (dispatch, getState) => {
        Axios.get(baseUrl + productsUri).then((response) => {
            console.log("Products: ", response.data);
            let products = response.data.data.map((product) => {
                let filename;
                if(product.originalname){
                    filename = product.originalname.substr(1, product.filename.length).replace("\\", "/");
                }
                return {
                    productDetail: product.productDetail,
                    productCode: product.productCode,
                    productCategory: product.productCategory,
                    productSubcategory: product.productSubcategory,
                    productQuantity: product.productQuantity,
                    productPosition: product.productPosition,
                    productOrder: product.productOrder,
                    filename: product.filename,
                    originalname: filename,
                };
            });
            dispatch(updateProducts(products));
        })
    }
}

const updateProducts = (products) => {
    console.log(products);
    return {
        type: UPDATE_PRODUCTS,
        products: products
    };
}

export const addProduct = (product) => {
    return (dispatch, getState) => {
        const data = new FormData();
        console.log("[ProductActions] addProduct - product: ", product);
        data.append("myimage", product.selectedFile, product.selectedFile.name);
        data.append("productDetail", product.productDetail);
        data.append("productCode", product.productCode);
        data.append("productCategory", product.productCategory);
        data.append("productSubcategory", product.productSubcategory);
        data.append("productQuantity", product.productQuantity);
        data.append("productPosition", product.productPosition);
        data.append("productOrder", product.productOrder);
        Axios.post(baseUrl + productsUri, data).then(response => {
            if (getState().products.products === null) {
                dispatch(getProducts());
            } else {
                dispatch(addProductCreator(response.data.data));
            }
        })
    }
};

const addProductCreator = (product) => {
    return {
        type: ADD_PRODUCT,
        product: product
    };
}
