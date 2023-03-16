import {TYPE} from '../actions/locationAction';
export const locationState={location:null}
export const locationReducer=(state=locationState,action)=>{
    switch (action.type) {
        case TYPE.ADD_LOCATION:
            return{
                ...state,
                location:action.data
            }
    
        default:
         return state;
    }
}
