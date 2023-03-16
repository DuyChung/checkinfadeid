import React,{useEffect} from 'react';
import {View,Text, Alert} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'; 
import {useDispatch,useSelector} from 'react-redux'
import faceController from '../controller/faceController'
import {addFace,deleteFace} from '../redux/actions/FaceActions'
const Stack = createStackNavigator();
import MainTab from './bottombar';
import FaceScreen from '../screens/faceScreen'
import FaceRecognition from '../screens/FaceRecognition'
import HistoryScreen from '../screens/historyScreen'
import TimeTable from '../screens/TimeTable'
import ChamCong from '../screens/ChamCong'
import CompanyScreen from '../screens/CompanyScreen'
import ShiftsScreen from '../screens/ShiftsScreen'
import ShiftsDetail from '../screens/ShiftsDetail'
import StaffScreen from '../screens/StaffScreen/index'
import StaffDetail from '../screens/StaffDetail'
import DepartmentScreen from '../screens/DepartmentScreen'
import DepartmentDetail from '../screens/DepartmentDetail'
import Employee from '../screens/EmployeeScreen'
import EmployeeDetail from '../screens/EmployeeDetail'
import authController from '../controller/authController'
import {log_in} from '../redux/actions/AuthenAction'
import Info from '../screens/infoScreen'
import LocationScreen from '../screens/locationScreen'
import geolocationActions from '../controller/geolocationActions';
import {addLocation} from '../redux/actions/locationAction';
import ChamCongCompany from '../screens/ChamCongCompany';
import Notifycation from '../screens/notifycation';
import UserCompany from '../screens/userCompany';
import CompanyRequireList from '../screens/CompayRequireList';
export function AppNavigator({user}) {
  useEffect(() => {
    getFaceData()
    getUserInfo();
    getCompanyLocation()
  }, [])

  const dispatch = useDispatch()

  const getCompanyLocation = async ()=>{
    const response = await geolocationActions.getCompanyLocation(user.company_id)
    if(response.code == 200 && response.data.length>0){
      dispatch(addLocation(response.data[0]))
    }
  }
  
  const getUserInfo= async()=>{
    const params ={
      phone:user.phone,
      password:user.password
    }
    const respone = await authController.login(params);
    const { code, data } = respone;
    if (code == 200 && data) {
      dispatch(log_in(data));
    } 
  }
  const getFaceData = async () => {
    const respone = await faceController.getFaceData(user.user_id)
    const {code,data}=respone
    if(code==200&&data.length>0){
      dispatch(addFace(data[0].face_data,data[0].name,data[0].user_id))
    }
    else{
      dispatch(deleteFace())
    }
  }
  return (
    <Stack.Navigator>
      <Stack.Screen component={MainTab} name={"MainTab"}  options={{ headerShown: false }}/>
      <Stack.Screen component={FaceScreen} name={"FaceScreen"} options={{ headerShown: false }} />
      <Stack.Screen component={FaceRecognition} name={"FaceRecognition"} options={{ headerShown: false }} />
      <Stack.Screen component={HistoryScreen} name={"HistoryScreen"} options={{ headerShown: false }} />
      <Stack.Screen component={TimeTable} name={"TimeTable"} options={{ headerShown: false }} />
      <Stack.Screen component={ChamCong} name={"ChamCong"} options={{ headerShown: false }} />
      <Stack.Screen component={CompanyScreen} name={"CompanyScreen"} options={{ headerShown: false }} />
      <Stack.Screen component={ShiftsScreen} name={"ShiftsScreen"} options={{ headerShown: false }} />
      <Stack.Screen component={ShiftsDetail} name={"ShiftsDetail"} options={{ headerShown: false }} />
      <Stack.Screen component={StaffScreen} name={"StaffScreen"} options={{ headerShown: false }} />
      <Stack.Screen component={StaffDetail} name={"StaffDetail"} options={{ headerShown: false }} />
      <Stack.Screen component={DepartmentScreen} name={"DepartmentScreen"} options={{ headerShown: false }} />
      <Stack.Screen component={DepartmentDetail} name={"DepartmentDetail"} options={{ headerShown: false }} />
      <Stack.Screen component={Employee} name={"Employee"} options={{ headerShown: false }} />
      <Stack.Screen component={EmployeeDetail} name={"EmployeeDetail"} options={{ headerShown: false }} />
      <Stack.Screen component={Info} name={"Info"} options={{ headerShown: false }} />
      <Stack.Screen component={LocationScreen} name={"LocationScreen"} options={{ headerShown: false }} />
      <Stack.Screen component={ChamCongCompany} name={"ChamCongCompany"} options={{ headerShown: false }} />
      <Stack.Screen component={Notifycation} name={"Notifycation"} options={{ headerShown: false }} />
      <Stack.Screen component={UserCompany} name={"UserCompany"} options={{ headerShown: false }} />
      <Stack.Screen component={CompanyRequireList} name={"CompanyRequireList"} options={{ headerShown: false }} />
      
    </Stack.Navigator>
  );
}
