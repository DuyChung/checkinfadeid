import React, { useState, useEffect } from "react";
import { View, Text,Image,TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { DateTimePicker, TextField, ImagePicker } from "../../../components";
import roomcomtroller from "../../../controller/roomController";
import {AppImgSrcs} from '../../../theme'
export default function PersionalInfo({setisShowPicker,isShowPicker,name,phone,birth_day ,company_id ,department_id, avatar, onChangeName, onChangeDate, onChangeAvatar}) {
  useEffect(() => {
    getDepartment();
  }, []);

  const [department, setdepartment] = useState(null);
  const [showModal, setshowModal] = useState(false)


  const getDepartment = async () => {
    const params = {
      company_id: company_id,
      department_id: department_id,
    };
    const response = await roomcomtroller.getDepartmentDetail(params);
    const { code, data } = response;
    if (code == 200 && data.length > 0) {
      setdepartment(data[0]);
    }
  };

  console.log('----avatar=====',avatar)
  const setImage =(uri)=>{
    onChangeAvatar(uri)
  }

  return (
    <View>
      <TouchableOpacity
        onPress={()=>setshowModal(true)}
      >
        <Image
          source={avatar || AppImgSrcs.ic_user}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Text style={styles.header}>{"Thông tin cá nhân"}</Text>
      
      <TextField
        title="Họ va tên"
        value={name}
        style={{ marginBottom: 10 }}
        onChangeText={onChangeName(this)}
      />

      <TextField
        title="Số điện thoại"
        value={phone}
        style={{ marginBottom: 10 }}
        editable={false}
      />

      <DateTimePicker
        date={birth_day}
        title={"Năm sinh"}
        onPress={setisShowPicker}
        open={isShowPicker}
        onConfirm={onChangeDate.bind(this)}
        style={{ marginBottom: 20 }}
      />

      <TextField
        title="Phòng ban"
        value={department && department.name ? department.name : "Trống"}
        style={{ marginBottom: 10 }}
        editable={false}
      />

      <ImagePicker
        showModal={showModal}
        setImage={setImage.bind(this)}
        onClose={()=>setshowModal(false)}
      />
    </View>
  );
}
