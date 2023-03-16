import Api from '../api/Api'
import user from '../models/user'

export default {
  register:(params)=>{
    const data = new user(params)
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.register(data)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  login:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.login(params)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  changePassword:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.changePassword(params)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  changeUserInfo:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.change_user_info(params)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  }

}
