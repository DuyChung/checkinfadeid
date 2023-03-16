import React, { useState } from "react";
import { ScrollView, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { AppColors, AppImgSrcs, AppMetrics } from "../../theme";
import { Header, ListEmptyComponent,Button } from "../../components";
import { styles } from "./style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5'
import ShiftsDetail from "../ShiftsDetail/index"
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

 const _renderItem =()=>(
   <TouchableOpacity 
   onPress={() =>navigation.navigate("StaffDetail")}
    onTouchEnd={()=>{}}
    style={styles.row}>
        <View >
          <Image style={styles.ava}
            source={require('../../assets/images/images/avatar.jpg')} />
        </View>
        <View style={styles.view}>
          <Text style={styles.text} >Nguyễn Nhật Trường</Text>
          <TouchableOpacity style={styles.call}>
            <Icon  name="phone-alt" size={25} color={AppColors.green} />
          </TouchableOpacity>
        </View>
        
   </TouchableOpacity>
 )
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Danh sách nhân viên"} 
        goBack={() => navigation.goBack()} 
        headerRight={headerRight()}
      />
      <View style={{ flex: 1,marginTop:(10) }}>
         <FlatList
            contentContainerStyle={{flexGrow:1}}
            data={[{},{}]}
            renderItem={({item})=>_renderItem(item)}
            ListEmptyComponent={<ListEmptyComponent title="Chưa có ca làm nào"/>}
         />
      </View>
    </View>
  );
}
