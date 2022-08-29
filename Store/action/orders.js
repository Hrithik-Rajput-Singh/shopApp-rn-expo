import CartItem from "../../model/Cartitem";
import OrderItem from "../../model/orderitem";

export const ADD_TO_ORDER = 'ADD_TO_ORDER';
export const SET_ORDER = 'SET_ORDER';

export const fetchorder = () => {
    //getting data from store
    //these 
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try{

            const response = await fetch(`https://shop-app-9d3e8-default-rtdb.firebaseio.com/orders/${userId}.json`);
            if(!response.ok){
                throw new Error("something went wrong")
            }
            const resData = await response.json()
        
            const orderUpload = [];
    
            for(key in resData){
                orderUpload.push(new OrderItem(key ,resData[key].cartItem,resData[key].totalamount,new Date(resData[key].date)))
            }

            dispatch({type: SET_ORDER,storeOrder: orderUpload});

        }catch(err){
            throw err;
        };

        
    };
}

export const addToOrder = (cartItem, totalamount) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token 
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(`https://shop-app-9d3e8-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItem,
                totalamount,
                date: date.toISOString()
            })
        }
        );

        if(!response.ok){
            throw new Error('something went wrong') ;
        }
   
        const resData = await response.json()
        

  
        dispatch({
            type: ADD_TO_ORDER,
            dataOrder: {id: resData.name,Item: cartItem, amount: totalamount,date: date} 
        
        })

    }

};