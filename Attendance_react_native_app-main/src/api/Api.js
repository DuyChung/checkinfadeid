const axios = require("axios");
import {constants} from '../constants/constants'
import {useSelector} from 'react-redux'

const url = 'https://attendance-server-vswr.vercel.app'

export default {
//convert GPS to address detail
  async getLocation(params) {
    return axios
      .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${params.long},${params.lat}.json?access_token=${constants.mapboxAPIKey}&language=vi&country=vn`)
      .then(function (response) {
        if(response.data){
          return response.data.features[0].place_name;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
// convert address toi GPS
  async getGPS (params) {
    return axios
      .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${params}.json?access_token=${constants.mapboxAPIKey}&language=vi&country=vn`)
      .then(function (response) {
          return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
//lấy dữ liệu khuôn mặt đã đăng kí
async getFaceData(id) {
  return axios
    .post(`${url}/face/getFaceList`,{user_id:id})
    .then(function (response) {
      if(response.data){
        return response.data;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//đăng kí khuôn mặt
async addFace(params) {
  return axios
    .post(`${url}/face/addFace`,{
      name:params.name,
      face_data:params.face_data,
      user_id:params.user_id
    })
    .then(function (response) {
      if(response.data){
        return response.data;
      }
    })
    .catch(function (error) {
      console.log("lỗi rồi:",error);
    });
},

//xoá khuôn mặt
async deleteFace(id) {
  return axios
    .post(`${url}/face/deleteFace`,{
      user_id:id
    })
    .then(function (response) {
      if(response.data){
        return response.data;
      }
    })
    .catch(function (error) {
      console.log("lỗi rồi:",error);
    });
},

//đăng kí
async register(params) {
  return axios
    .post(`${url}/users/register`,{
      name:params.name,
      face_data:params.face_data||null,
      user_id:params.phone,
      company_id:params.company_id,
      root:params.root||false,
      room:params.room||null,
      phone:params.phone,
      day_of_birth:params.day_of_birth,
      password:params.password,
      department_id:params.department_id,
      avatar:params.avatar
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//đăng nhập
async login(params) {
  console.log('===========route======',`${url}/users/test`)
  console.log('===========params======',params)
  return axios
    .post(`${url}/users/login`,{
      user_id:params.phone,
      password:params.password
    })
    .then(function (response) {
      console.log('===============res=========',response.data)
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log('======e=====',error);
    });
},

//điểm danh
async attendance(params) {
  return axios
    .post(`${url}/attendance/attendance`,{
      user_id:params.user_id,
      time:params.time,
      type:params.type,
      location:params.location,
      date:params.date,
      status:params.status,
      shifts:params.shifts,
      chamcong_id:params.chamcong_id,
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//lấy danh sách lịch sử điểm danh
async getAttendanceHistory(id) {
  return axios
    .post(`${url}/attendance/getAttendanceList`,{
      user_id:id,
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//lấy danh sách lịch sử chấm công
async getChamcongHistory(params) {
  return axios
    .post(`${url}/chamcong/getChamcongList`,{
      user_id:params.user_id,
      monthyear:params.monthyear
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//thêm ca làm
async addShifts(params) {
  return axios
    .post(`${url}/shifts/addShifts`,{
        name:params.name,
        working_day:params.working_day,
        time_start:params.time_start,
        time_end:params.time_end,
        date_in_week:params.date_in_week,
        company_id:params.company_id,
        shifts_code:Math.random()
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//danh sách ca làm
async getShiftsList(id) {
  return axios
    .post(`${url}/shifts/getShiftsList`,{
        company_id:id,
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//sửa ca làm
async editShifts(params) {
  return axios
    .post(`${url}/shifts/editShifts`,{
        shifts_code:params.shifts_code,
        name:params.name,
        working_day:params.working_day,
        time_start:params.time_start,
        time_end:params.time_end,
        date_in_week:params.date_in_week,
        company_id:params.company_id,
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//xoá ca làm
async deleteShifts(id,code) {
  return axios
    .post(`${url}/shifts/deleteShifts`,{
        company_id:id,
        shifts_code:code
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//lấy danh sách user trong công ty
async getUserList(id) {
  return axios
    .post(`${url}/users/getUserList`,{
        company_id:id,
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//tìm kiếm user bằng id
async findUserById(id) {
  return axios
    .post(`${url}/users/findUserById`,{
      user_id:id,
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

async addEmployee(user_id,company_id) {
  return axios
    .post(`${url}/users/changeinfo`,{
      user_id:user_id,
      company_id:company_id
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

async addRoom(params) {
  console.log(JSON.stringify(params))
  return axios
    .post(`${url}/room/addRoom`,{
      name:params.name,
      shifts:params.shifts,
      employees:params.employees,
      company_id:params.company_id,
      department_id:params.department_id
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

async editRoom(params) {
  return axios
    .post(`${url}/room/editRoom`,{
      name:params.name,
      shifts:params.shifts,
      employees:params.employees,
      company_id:params.company_id,
      department_id:params.department_id
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},


async deleteRoom(params) {
  console.log(params)
  return axios
    .post(`${url}/room/deleteRoom`,{
      company_id:params.company_id,
      department_id:params.department_id
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

async getDepartmentList(id) {
  return axios
    .post(`${url}/room/getRoomList`,{
      company_id:id
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

async changeDepartment (user_id,room) {
  return axios
    .post(`${url}/users/changeinfo`,{
      user_id:user_id,
      room:room
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//đổi thông tin cá nhân
async change_user_info (params) {
  return axios
    .post(`${url}/users/changeinfo`,{
      user_id:params.user_id,
      phone:params.phone,
      day_of_birth:params.day_of_birth,
      avatar:params.avatar,
      name:params.name
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//lấy danh sách nhân viên trong phòng ban
async getUserListByDepartment (department_id,company_id) {
  return axios
    .post(`${url}/users/getUserByDepartment`,{
      department_id:department_id,
      company_id:company_id
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//xoá nhân viên khỏi phòng ban
async deleteUserInDepartment (params) {
  return axios
    .post(`${url}/room/deleteOneEmployee`,{
      department_id:params.department_id,
      company_id:params.company_id,
      user_id:params.user_id
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//thêm nhân viên vào phòng ban
async addUserInDepartment (params) {
  return axios
    .post(`${url}/room/insertOneEmployee`,{
      department_id:params.department_id,
      company_id:params.company_id,
      user_id:params.user_id
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//thêm ca làm vào phòng ban
async addShiftsInDepartment (params) {
  return axios
    .post(`${url}/room/insertShifts`,{
      department_id:params.department_id,
      company_id:params.company_id,
      shifts:params.shifts
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//xoá ca làm khỏi phòng ban
async deleteShiftsInDepartment (params) {
  return axios
    .post(`${url}/room/deleteShifts`,{
      department_id:params.department_id,
      company_id:params.company_id,
      shifts:params.shifts
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//lấy chi tiết phòng ban
async getDepartmentDetail(params) {
  return axios
    .post(`${url}/room/getRoomDetail`,{
      department_id:params.department_id,
      company_id:params.company_id,
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//lấy danh sách ca làm trong ngày
async getShiftsInDay(params) {
  return axios
    .post(`${url}/shifts/getShiftsByDay`,{
      department_id:params.department_id,
      company_id:params.company_id,
      day:params.day
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//lấy danh sách chấm công theo ngày
async getChamcongInDay(params) {
  return axios
    .post(`${url}/chamcong/getChamcongByDay`,{
      user_id:params.user_id,
      day:params.day
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//Đổi mật khẩu
async changePassword(params) {
  return axios
    .post(`${url}/users/ChanePassword`,{
      user_id:params.user_id,
      old_password:params.old_password,
      new_password:params.new_password
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//Lấy vị trí công ty
async getCompayLocation(company_id) {
  return axios
    .post(`${url}/location/getLocationList`,{
      company_id:company_id,
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//thêm vị trí công ty
async addCompayLocation(params) {
  return axios
    .post(`${url}/location/addLocation`,{
        name:params.name,
        location:params.location,
        company_id:params.company_id
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},

//sửa vị trí công ty
async editCompayLocation(params) {
  return axios
    .post(`${url}/location/editLocation`,{
        name:params.name,
        location:params.location,
        company_id:params.company_id
    })
    .then(function (response) {
      if(response.data){
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},
}
