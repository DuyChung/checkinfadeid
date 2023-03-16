import React, { useState } from "react";
import { ScrollView, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { AppColors, AppImgSrcs, AppMetrics } from "../../theme";
import { Header, ListEmptyComponent,Button } from "../../components";
import { styles } from "./style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5'

import ModalDropdown from 'react-native-modal-dropdown';
import { TextInput } from "react-native-element-textinput";
import DatePicker from 'react-native-date-picker'
export default function ShiftsScreen({ navigation }) {
 const headerRight =()=>{
   return(
     <TouchableOpacity style={{flex:1}}>
        <Ionicons
          name={'add-circle'}
          size={(25)}
          color={AppColors.green}
      />
     </TouchableOpacity>
   )
 }

 const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
 const _renderItem =()=>(
  <View style={{alignItems:'center'}} >
    <ScrollView style={{width:'90%',height:"100%", marginBottom:10 }} >
      <Text style={styles.text1} >Cá nhân</Text>
        <Text style={styles.text2} >   Họ và tên </Text>
        <TextInput  style={styles.textinput} placeholder="Họ và tên" placeholderTextColor="gray"  />
        <Text style={styles.text2} >   Ngày sinh </Text>
        {/* <TextInput  style={styles.textinput} placeholder="Ngày sinh" placeholderTextColor="gray" /> */}
        {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            console.log("date==",date.toJSON())
          }}
          onCancel={() => {
            setOpen(false)}}/>
        <TouchableOpacity style={styles.touch} onPress={() => setOpen(true)}  >
          <Text style={{fontSize:18,alignItems:'center',justifyContent:"center"}} > {Date()} </Text>
        </TouchableOpacity>
      <Text style={styles.text1} >Chức vụ</Text>
        <Text style={styles.text2} >   Chức vụ </Text>
        <ModalDropdown style={styles.dropdown} 
          textStyle={{fontSize:20,}}
          dropdownTextStyle={{fontSize:18,textAlign:'center',}}
          dropdownStyle={{width:"90%",}}
          options={['Giám đốc', 'Nhân viên']}/>
        <Text style={styles.text2} >   Phòng ban</Text>
        <ModalDropdown style={styles.dropdown} 
          textStyle={{fontSize:20,}}
          dropdownTextStyle={{fontSize:18,textAlign:'center',}}
          dropdownStyle={{width:"90%",}}
          options={['Giám đốc', 'Kỹ thuật','Thiết kế','Tiếp thị','Kinh doanh',]}/>
      <Text style={styles.text1} >Liên hệ</Text>
        <Text style={styles.text2} >   Số điện thoại </Text>
        <TextInput style={styles.textinput} placeholder="0379137483" keyboardType="numeric"  placeholderTextColor="gray"/>
        <Text style={styles.text2} >   Email </Text>
        <TextInput style={styles.textinput} placeholder="+0379137483@gmail.com"  placeholderTextColor="gray" />
        <Text style={styles.text2} >   Địa chỉ </Text>
        <TextInput style={styles.textinput} placeholder="Địa chỉ" placeholderTextColor="gray"  />
    </ScrollView>
  </View>
 )
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Thông tin"} 
        goBack={() => navigation.goBack()} 
        headerRight={headerRight()}
      />
      <View style={{ flex: 1,marginTop:(10) }}>
         <FlatList
            contentContainerStyle={{flexGrow:1}}
            data={[{},]}
            renderItem={({item})=>_renderItem(item)}
            ListEmptyComponent={<ListEmptyComponent title="Chưa có ca làm nào"/>}
         />
      </View>
      <View style={{flexDirection:'row',marginBottom:AppMetrics.marginLeft,justifyContent:'space-between',marginHorizontal:AppMetrics.marginLeft}}>
        <Button style={styles.button} title={'Thêm'}/>
        <Button style={styles.button} title={'Xoá'}/>
      </View>
    </View>
  );
}
