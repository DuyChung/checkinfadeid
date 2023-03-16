var room = require("../models/room");

module.exports = {
  //lấy danh sách phòng ban
  getRoomsList: (id) => {
    return room
      .find({ company_id: id })
      .select(" name shifts employees department_id");
  },

  //lấy chi tiết phòng ban
  getRoomDetail: (id,department_id) => {
    return room
      .find({ company_id: id , department_id: department_id})
      .select(" name shifts employees department_id");
  },

  //thêm phòng ban
  addRoom: (params) => {
    return new room(params).save();
  },

  //sửa ca làm
  editRoom: (params, body) => {
    return room.updateOne(
      { department_id: params.department_id, company_id: params.id },
      body
    );
  },
  //xoá ca làm
  deleteRoom: (params) => {
    return room.deleteOne({ department_id: params.department_id, company_id: params.id });
  },

    //lấy phòng ban theo id
    findRoomById: (company_id,department_id) => {
      return room
        .find({ company_id: company_id , department_id:department_id })
        .select(" name shifts employees ");
    },

    //  //xoá nhân viên của phòng ban
    //  deleteOneEmployee: (params) => {
    //    let data = room
    //    .find({ company_id: params.company_id , department_id:params.department_id })
    //    .select(" name shifts employees ");
    //    console.log('-----------data==========',data)
    //   // return room.updateOne(
    //   //   { department_id: params.department_id, company_id: params.id },
    //   //   body
    //   // );
    //  }
};
