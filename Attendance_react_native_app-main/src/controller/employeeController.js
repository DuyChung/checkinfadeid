import Api from '../api/Api'

export default {
    getUserList:(id)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.getUserList(id)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },
  
  findUserById:(id)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.findUserById(id)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  addEmployee:(user_id,company_id)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.addEmployee(user_id,company_id)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  changeDepartment:(user_id,room)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const respone = await  Api.changeDepartment(user_id,room)
        resolve(respone)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },
}
