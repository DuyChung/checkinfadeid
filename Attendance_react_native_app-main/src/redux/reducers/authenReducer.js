import {TYPE} from '../actions/AuthenAction';
export const authenstate={user:null}
export const AuthenReducer=(state=authenstate,action)=>{
    switch (action.type) {
        case TYPE.SIGN_IN:
            return{
                ...state,
                user:action.user
            }
            case TYPE.LOG_OUT:
                return{
                    ...state,
                    user:null
                }
    
        default:
         return state;
    }
}
