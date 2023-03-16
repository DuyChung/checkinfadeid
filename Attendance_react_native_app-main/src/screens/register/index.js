import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { TextField, Button, Checkbox,DateTimePicker } from "../../components";
import { AppMetrics, AppColors } from "../../theme";
import { styles } from "./styles";
import Toast from 'react-native-toast-message'
import Util from '../../constants/Util'
import authController from '../../controller/authController'

export default function Register({ navigation }) {
  const [check, setcheck] = useState(false);
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [accountType, setaccountType] = useState(0);
  const [re_password, setre_password] = useState(0);
  const [name, setname] = useState("");
  const [company_name, setcompany_name] = useState("");
  const [birdthDay, setbirdthDay] = useState(new Date());
  const [isShowPicker, setisShowPicker] = useState(false)
  const [loading, setloading] = useState(false)
  const [root, setroot] = useState(false)

  const onChangeText = (type, text) => {
    switch (type) {
      case "phone":
        setphone(text);
        break;
      case "password":
        setpassword(text);
        break;
      case "name":
        setname(text);
        break;
      case "company_name":
        setcompany_name(text);
        break;
      case "re_password":
        setre_password(text);
        break;
      default:
        break;
    }
  };

  const onChangDate=(date)=>{
    setisShowPicker(false)
    setbirdthDay(date)
  }

  const onRegister= async()=>{
    setloading(true)
    let message = ''
    let typeToast = 'error'
    let isNoEmpty = true
    let params ={}
    if(accountType==0){
       params = {name,birdthDay,phone,password,re_password,root} 
    }
    else{
      params = {name,birdthDay,phone,password,re_password,company_name,root}
    }
    for(const key in params){
      if(Util._isStringEmpty(params[key])=== true){
        isNoEmpty = false
      }
      else{
        isNoEmpty = true
      }
    }
    if(isNoEmpty == false){
      message = 'Vui lòng điền đầy đủ thông tin!'
      setloading(false)
    } else if(password!==re_password){
      message ='Các mật khẩu không khớp. Vui lòng thử lại!'
      setloading(false)
    } else if(Util._validatePhone(phone)==false){
      message = 'Vui lòng nhập số điện thoại hợp lệ!'
      setloading(false)
    }

 
   if(isNoEmpty == true &&
      password==re_password&&
      Util._validatePhone(phone)== true
    ){
      const response = await authController.register(params)
      if(response.code == 200){
        setloading(false)
        typeToast='success',
        message=response.message
        navigation.goBack()
      }
      else{
        setloading(false)
        typeToast='error',
        message=response.message
      }
    }

    if(message){
      Toast.show({
        type:typeToast,
        text1:'Face attendance',
        text2:message
      })
    }
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.Login}>{"ĐĂNG KÝ"}</Text>

      <View style={styles.renderInput}>
        <TextField
          title={"Họ và tên"}
          onChangeText={onChangeText.bind(this, "name")}  
          value={name}
        />
      
        <DateTimePicker
          date={birdthDay}
          title={'Năm sinh'}
          onPress={()=>setisShowPicker(true)}
          open={isShowPicker}
          onConfirm={onChangDate.bind(this)}
        />

        <TextField
          title={"Số Điện Thoại"}
          onChangeText={onChangeText.bind(this, "phone")}
          value={phone}
        />
        {accountType == 1 && (
          <TextField
            title={"Tên Công ty"}
            onChangeText={onChangeText.bind(this, "company_name")}
            value={company_name}
          />
        )}

        <TextField
          title={"Mật khẩu"}
          secureTextEntry={!check}
          onChangeText={onChangeText.bind(this, "password")}
          value={password}
        />

        <TextField
          title={"Nhập lại mật khẩu"}
          secureTextEntry={!check}
          onChangeText={onChangeText.bind(this, "re_password")}
          value={re_password}
        />

        <Checkbox
          style={{ marginHorizontal: AppMetrics.marginLeft }}
          check={check}
          label={"Hiện mật khẩu"}
          onPress={() => setcheck(!check)}
        />

        <View style={styles.renderCheckBox}>
          <Checkbox
            style={{ marginHorizontal: AppMetrics.marginLeft }}
            check={accountType == 0 ? true : false}
            label={"Nhân viên"}
            onPress={() => {setaccountType(0); setroot(false)}}
            type="radio"
          />

          <Checkbox
            style={{ marginHorizontal: AppMetrics.marginLeft }}
            check={accountType == 1 ? true : false}
            label={"Công ty"}
            onPress={() => {setaccountType(1);setroot(true)}}
            type="radio"
          />
        </View>
      </View>

      <Button onPress={()=>onRegister()} style={styles.button} title={"Đăng ký"} loading={loading} />
      <Text style={{ marginVertical: 15, textAlign: "center" }}>
        {"Đã có tài khoản?"}
        <Text
          onPress={() => navigation.navigate("LoginScrenn")}
          style={{ color: AppColors.green }}
        >
          {"Đăng nhập"}
        </Text>
      </Text>
    </ScrollView>
  );
}
