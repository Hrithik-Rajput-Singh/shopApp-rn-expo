import {  AUTHENTIC, LOGOUT } from "../action/auth";
//we dont need know LOGIN AND SIGNUP BECAUSE W COMBINE IT

const initialState = {
    token: null,
    userId: null

}

const authReducer =  (state = initialState, action) => {
    switch (action.type) {
            case AUTHENTIC:
                return{
                    token: action.token,
                    userId: action.userId
                }

            // case SIGNUP:
            //     return{
            //         token: action.token,
            //         userId: action.userId
            //     }     
            case LOGOUT:
                return{
                   initialState
                }      
    
        default:
            return state;
    }
}

export default authReducer;