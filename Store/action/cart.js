export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_REMOVE = 'ADD_TO_REMOVE';

export const addTocart = (product) => {
    return{
        type: ADD_TO_CART,
        product: product
    }
};

export const addToRemove = (productid) => {
    return{
        type: ADD_TO_REMOVE,
        proId: productid
    }
};