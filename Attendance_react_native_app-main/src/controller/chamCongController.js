import Api from '../api/Api'
import user from '../models/user'

export default {
  getHistory:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.getChamcongHistory(params)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  //lấy danh sách chấm công theo ngày 
  getChamcongInDay:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.getChamcongInDay(params)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },
}
