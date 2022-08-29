import {ADD_TO_CART, ADD_TO_REMOVE} from '../action/cart';
import CartItem from '../../model/Cartitem';
import {ADD_TO_ORDER} from '../action/orders';
import { ADD_TO_DELETE } from '../action/product';

const initialState = {
    items: {},
    totalAmount: 0
}



const cartReducer =(state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
           
        const addedProduct = action.product;
        const prodPrice = addedProduct.price;
        const prodTitle = addedProduct.title;


        if (state.items[addedProduct.id]) {    //add or access a dynamic property in javascript object

            //already item exist
            const updateCartItem = new CartItem (
                state.items[addedProduct.id].quantity + 1,
                prodPrice,
                prodTitle,
                state.items[addedProduct.id].sum + prodPrice

            );
            return{
                ...state,
                items: {...state.items,[addedProduct.id]: updateCartItem},
                totalAmount: state.totalAmount + prodPrice
                    //taking old state snapshot then in items adding before all state item then setting key as addedproduct and it value as upadatenewcart
            }
        }else{
            //adding that item 
            const newCartItem = new CartItem( 1 , prodPrice , prodTitle , prodPrice)
            return {
                ...state, items: {...state.items,[addedProduct.id]: newCartItem}, 
                totalAmount: state.totalAmount + prodPrice
                  //taking all before state item and adding in it with key and value 
              

            }
        }

        case ADD_TO_REMOVE:

        const selectedCartItem = state.items[action.proId]
        const itemQuantity = selectedCartItem.quantity
        let updatedingItem

        if (itemQuantity > 1){
            //remove one 
            const updatingCartItem = new CartItem(selectedCartItem.quantity - 1,selectedCartItem.productPrice,selectedCartItem.productTitle,selectedCartItem.sum - selectedCartItem.productPrice)

            updatedingItem = {...state.items, [action.proId]: updatingCartItem};

        }else{
            updatedingItem = {...state.items}
            delete updatedingItem[action.proId];
        };
        return {
            ...state,
            items: updatedingItem,
            totalAmount: state.totalAmount - selectedCartItem.productPrice
        }
        //we are here trying to clear the cart when we pres order now ,,lecture clearing the cart
        case ADD_TO_ORDER:
            return initialState;

        case ADD_TO_DELETE:
            if (!state.items[action.prod]){
                return state
            }
            const updatedItem = {...state,items};
            const itemTotal = state.items[action.prod].sum;
            delete updatedItem[action.prod];

            return{
                ...state,
                items: updatedItem,
                totalAmount: state.totalAmount - itemTotal
            }
    }

    return state;
}

export default cartReducer;