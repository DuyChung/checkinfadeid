import Api from '../api/Api'

export default {
  getFaceData:(id)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await Api.getFaceData(id)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  addFace:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.addFace(params)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  deleteFace:(id)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.deleteFace(id)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  attendance:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.attendance(params)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  getAttendanceHistory:(id)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.getAttendanceHistory(id)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  }


}
