import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { AppColors, AppImgSrcs, AppMetrics } from "../../theme";
import { styles } from "./styles";
import { useSelector,useDispatch } from "react-redux";
import { Header, TextField,Button } from "../../components";
import PersionalInfo from "./PersionalInfo";
import authController from "../../controller/authController";
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from "react-native-toast-message";
import {log_in} from '../../redux/actions/AuthenAction'

export default function Info({ navigation }) {
  const user = useSelector((state) => state.AuthenReducer.user);
const dispatch = useDispatch()
  const [old_password, setold_password] = useState("");
  const [new_password, setnew_password] = useState("");
  const [re_new_password, setre_new_password] = useState("");
  const [isShow, setisShow] = useState(false)
  const [loading, setloading] = useState(false)
  const [name, setname] = useState(user.name)
  const [birth_day, setbirth_day] = useState(new Date(user.day_of_birth))
  const [isShowPicker, setisShowPicker] = useState(false)
  const [avatar, setavatar] = useState(user.avatar)
  const [SaveLoading, setSaveLoading] = useState(false)

  const onchange = (type, value) => {
    switch (type) {
      case 1:
        setold_password(value);
        break;
      case 2:
        setnew_password(value);
        break;
      case 3:
        setre_new_password(value);
        break;
      default:
        break;
    }
  };

  const onchangePass = async()=>{
    let params = {
      old_password:old_password,
      new_password:new_password,
      user_id:user.user_id
    }
    if(new_password !== re_new_password){
      Toast.show({
        text1: "Face attendance",
        text2: "Các mật khẩu mới không khớp nhau",
        type:'error'
      });
    }
    else{
     setloading(true)
      const response = await authController.changePassword(params)
      const {code,message}= response
      if(code==200){
         setloading(false)
        Toast.show({
          text1: "Face attendance",
          text2: "Thay đổi thành công",
        });
        setisShow(false)
        setnew_password('')
              setold_password('')
              setre_new_password('')
      }
      else{
           setloading(false)
          Toast.show({
            text1: "Face attendance",
            type:'error',
            text2: message,
          });
      }
    }

  }

  const renderButton=()=>{
    if(!isShow){
      return(
        <View style={styles.renderButton}>
          <Button
            title={'Lưu'}
            style={styles.button}
            onPress={()=>onChange_user_info()}
            loading={SaveLoading}
          />
        </View>
      )
    }
    else{
      return(
        <View style={styles.renderButton}>
          <Button
            title={'Huỷ'}
            style={[styles.button,{marginRight:15,backgroundColor:'red'}]}
            onPress={()=>{
              setisShow(false)
              setnew_password('')
              setold_password('')
              setre_new_password('')
            }}
          />

          <Button
            title={'Thay đổi'}
            style={styles.button}
            onPress={()=>onchangePass()}
            loading={loading}
          />

        </View>
      )
    }
  }

  const changeName =(name)=>{
    setname(name)
  }

  const onChangeDate=(date)=>{
    setisShowPicker(false)
    setbirth_day(date)
  }

  const onChange_user_info= async()=>{
    setSaveLoading(true)
    const parmas={
      name:name,
      day_of_birth:birth_day,
      avatar:avatar,
      user_id: user.user_id
    }
    const response = await authController.changeUserInfo(parmas)
    const {code,data} = response
    if(code==200 && data.length>0){
      dispatch(log_in(data[0]))
      setSaveLoading(false)
      Toast.show({
        text1: "Face attendance",
        text2: 'Thành Công',
    })
    }
  else{
    setSaveLoading(false)
    Toast.show({
      text1: "Face attendance",
      text2: 'Đã có lõi xảy ra vui lòng thử lại sau',
      type:'error'
  })
  }
}

const onChangeAvatar =(uri)=>{
  setavatar({uri:uri})
}

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Thông tin cá nhân"} goBack={() => navigation.goBack()} />
      <ScrollView>

        <PersionalInfo
          name={name}
          phone={user.phone}
          birth_day={birth_day}
          company_id={user.company_id}
          department_id={user.department_id}
          avatar={avatar}
          onChangeName={()=>changeName.bind(this)}
          onChangeDate={onChangeDate.bind(this)}
          isShowPicker={isShowPicker}
          setisShowPicker={()=>setisShowPicker(true)}
          onChangeAvatar={onChangeAvatar.bind(this)}
        />

        {!isShow &&<TouchableOpacity 
          style={{flexDirection:'row',alignItems:'center',marginHorizontal:AppMetrics.marginLeft}}
          onPress={()=>setisShow(true)}  
        >
          <Text style={{color:AppColors.green}}>{'Đổi mật khẩu'}</Text>
          <Icon name='chevron-down' color={AppColors.green}/>
        </TouchableOpacity>}
        {
          isShow &&<View>
          <Text style={styles.content}>{"Đổi mật khẩu"}</Text>
          <TextField
            title={"Mật khẩu cũ"}
            onChangeText={onchange.bind(this, 1)}
            value={old_password}
            style={{ marginBottom: 15 }}
            secureTextEntry={true}
          />

          <TextField
            title={"Mật khẩu mới"}
            onChangeText={onchange.bind(this, 2)}
            value={new_password}
            style={{ marginBottom: 15 }}
            secureTextEntry={true}
          />

          <TextField
            title={"Nhập lại mật khẩu mới"}
            onChangeText={onchange.bind(this, 3)}
            value={re_new_password}
            style={{ marginBottom: 15 }}
            secureTextEntry={true}
          />
        </View>
        }

        {renderButton()}
        
      </ScrollView>
    </SafeAreaView>
  );
}
