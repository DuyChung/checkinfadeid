import {TYPE} from '../actions/FaceActions';
export const statee={facedataa:{}}
export const FaceReducer =(state=statee,action)=>{
    switch (action.type) {
        case TYPE.REGISTER_FACE:
            return{
                ...state,
                facedataa:{face:action.data,name:action.name,user_id:action.user_id}
            }
            case TYPE.DELETE_FACE:
              return{
                  ...state,
                  facedataa:{}
              }
        default:
         return state;
    }
}
