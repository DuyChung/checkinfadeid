export const TYPE={
    SIGN_IN:'SIGN_IN',
    LOG_OUT:'LOG_OUT'
}
export const log_in=(user)=>{
    return{
        type:TYPE.SIGN_IN,
        user:user
    }
}
export const logOut=()=>{
    return{
        type:TYPE.LOG_OUT,
    }
}