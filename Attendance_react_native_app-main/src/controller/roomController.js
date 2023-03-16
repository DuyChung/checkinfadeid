import Api from '../api/Api'

export default {

  addroom:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.addRoom(params)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  getDepartmentList:(id)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.getDepartmentList(id)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  editDepartment:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.editRoom(params)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  deleteDepartment:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.deleteRoom(params)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  //lấy danh sách nhân viên trong trong phòng ban
  getUserListByDepartment:(department_id,company_id)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.getUserListByDepartment(department_id,company_id)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  //xoá nhân viên trong phòng ban
  deleteUserInDepartment:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.deleteUserInDepartment(params)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

   //thêm nhân viên trong phòng ban
   addUserInDepartment:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.addUserInDepartment(params)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  //thêm ca làm trong phòng ban
  addShiftsInDepartment:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.addShiftsInDepartment(params)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  //thêm ca làm trong phòng ban
  deleteShiftsInDepartment:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.deleteShiftsInDepartment(params)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  //lấy chi tiết phòng ban
  getDepartmentDetail:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.getDepartmentDetail(params)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

}
