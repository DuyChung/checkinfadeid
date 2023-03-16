export const TYPE={
  REGISTER_FACE:'REGISTER_FACE',
  DELETE_FACE:'DELETE_FACE'
}
export const addFace=(data,name,user_id)=>{
  return{
      type:TYPE.REGISTER_FACE,
      data:data,
      name:name,
      user_id:user_id
  }
}

export const deleteFace=()=>{
  return{
      type:TYPE.DELETE_FACE,
  }
}
