import {ADD_TO_ORDER, SET_ORDER} from '../action/orders';
import OrderItem from '../../model/orderitem';

const initialState = {
    orders: []
}

const orderReducer =(state = initialState, action) => {
    //
    switch (action.type) {
        case SET_ORDER:
            return{
                orders: action.storeOrder,
            };

        case ADD_TO_ORDER:

        const newOrder = new OrderItem(action.dataOrder.id,action.dataOrder.Item,action.dataOrder.amount,action.dataOrder.date);
        return{
            ...state,
            orders: state.orders.concat(newOrder)
        }

    };
    return state;
};

export default orderReducer;