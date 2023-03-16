export const TYPE={
  ADD_LOCATION:'ADD_LOCATION',
}
export const addLocation=(params)=>{
  return{
      type:TYPE.ADD_LOCATION,
      data:params
  }
}

