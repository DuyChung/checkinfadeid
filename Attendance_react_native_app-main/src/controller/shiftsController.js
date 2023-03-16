import Api from '../api/Api'

export default {
  
  //thêm ca làm
  addShifts:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.addShifts(params)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

   //danh sách ca làm
   getShiftsList:(id)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.getShiftsList(id)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

   //sửa ca làm
   editShifts:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.editShifts(params)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

   //xoá ca làm
   deleteShifts:(id,code)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.deleteShifts(id,code)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

   //lấy danh sách ca làm theo ngày
   getShiftsInDay:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.getShiftsInDay(params)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },
}
