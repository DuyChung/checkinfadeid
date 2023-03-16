import React, { useState,useEffect } from "react";
import { ScrollView, Text, View,Image,FlatList } from "react-native";
import { AppImgSrcs, AppMetrics } from "../../theme";
import {
  Header,
  Button,
  TextField,
  Checkbox,
  Modal
} from "../../components";
import { styles } from "./styles";
import {useSelector} from 'react-redux'
import shiftsController from '../../controller/shiftsController'
import { Alert } from "react-native";
import Toast from 'react-native-toast-message'
import moment from 'moment'
import roomController from '../../controller/roomController'
import employeeController from '../../controller/employeeController'

export default function EmployeeDetail({ navigation, route }) {

  const [editloading, seteditloading] = useState(false)
  const [deleteloading, setdeleteloading] = useState(false)
  const [Departments, setDepartments] = useState([])
  const [isShow, setisShow] = useState(false)


  const user = useSelector(state => state.AuthenReducer.user)

  let data;
  if (route.params.data) {
    data = route.params.data;
  }
  console.log("huhu",data)
  // const [departmentSellected, setdepartmentSellected] = useState(data.room)
  // const [employee_of_room, setEmployee_of_room] = useState(data.room.employees)
  useEffect(() => {
    getDepartment();
  }, [])

  const saveChange=async()=>{
    console.log('----data======-,',data)
   //user_id:data.user_id
  }

  const deleteShift=async()=>{
    setdeleteloading(true)
    const response= await shiftsController.deleteShifts(user.company_id,data.shifts_code)
    if(response.code==200){
      Toast.show({
        text1:'Face attendance',
        text2:'Xoá thành công'
      })
      setdeleteloading(false)
      navigation.goBack()
    }
    else{
      setdeleteloading(false)
      Toast.show({
        type:'error',
        text1:'Face attendance',
        text2:'Xoá thất bại'
      })
    }
  }

  const getDepartment = async () => {
    const respone = await roomController.getDepartmentList(user.company_id);
    const { code, data } = respone;
    if (code == 200 && data) {
      setDepartments(data);
    } else {
      setDepartments([]);
    }
  };
  
  const onCheck = (room) => {
      setdepartmentSellected(room);
      setisShow(false)
  };

  const isChecked = (index) => {
    // if(departmentSellected){
    //   if(departmentSellected.department_id == index){
    //     return true
    //   }
    //   else{
    //     return false
    //   }
    // }
  };

  const render_body=()=>{
    return(
      <View>
         <FlatList
         style={{marginTop:10}}
            data={Departments}
            renderItem={({item})=>(
              <View style={styles.renderDepartmant}>
                  <Checkbox
                    check={isChecked(item.department_id)}
                    onPress={()=>onCheck(item)}
                  />
                  <Text style={{marginLeft:AppMetrics.marginLeft}}>{item.name}</Text>
              </View>
            )}
         />
      </View>
    )
  }

  const submit=async()=>{
    // const response= await employeeController.changeDepartment(data.user_id,departmentSellected)
    // console.log('-----',response)
    setisShow(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Chi tiết nhân viên"} goBack={() => navigation.goBack()} />
      
      <ScrollView style={{marginTop:20}}>
          <Text style={styles.title}>{'Cá nhân'}</Text>
          <TextField
            title={'Họ và tên'}
            value={data.name}
            editable={false}
          />    

           <TextField
            title={'Ngày tháng năm sinh'}
            value={moment(data.day_of_birth).format('DD/MM/YYYY') }
            editable={false}
          />          

            <Text style={{marginHorizontal:AppMetrics.marginLeft}}>{'Phòng ban'}</Text>
            <View onTouchEnd={()=>setisShow(true)} style={styles.picker}>
               <Text>{'Trống'}</Text>
               {/* <Text>{departmentSellected||'Trống'}</Text> */}
               <Image
                  onPress={()=>setisShow(true)}
                  source={AppImgSrcs.ic_down}
                  resizeMode='center'
               />
            </View>

      </ScrollView>
      
      <View
        style={{
          flexDirection: "row",
          marginBottom: AppMetrics.marginLeft,
          justifyContent: "space-between",
          marginHorizontal: AppMetrics.marginLeft,
        }}
      >
        <Button style={styles.button} title={"Lưu thay đổi"} onPress={()=>saveChange()} loading={editloading} />
        <Button
          style={[styles.button, { backgroundColor: "red" }]}
          title={"Xoá"}
          onPress={()=>deleteShift()}
          loading={deleteloading} 
        />
      </View>
      <Modal
        title="Phòng ban"
        isVisible={isShow}
        renderBody={() => render_body()}
        onClose={() => setisShow(false)}
        showButton={false}
        
      />
    </View>
  );
}
