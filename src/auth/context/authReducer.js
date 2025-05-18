import { types } from "../types";

// const initialState = {
//     logged: false,
// }


export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                logged: true,
                user: action.payload,
            }
        case types.logout:
            return {
                logged: false,
            }    
            
            break;
    
        default:
            return state;
    }
}
