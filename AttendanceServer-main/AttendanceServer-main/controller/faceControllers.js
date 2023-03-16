var face = require("../models/face");

module.exports = {
  //lấy danh sách khuôn mặt
  getFacesList: (id) => {
    return face
      .find({ user_id: id })
      .select(" name face_data user_id");
  },
  //thêm khuôn mặt
  addFace: (params) => {
    return new face(params).save();
  },

  //xoá khuôn mặt
  deleteFace: (id) => {
    return face.deleteOne({ user_id: id });
  },
};
