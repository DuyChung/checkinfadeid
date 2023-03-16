import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native';
import { AppImgSrcs, AppMetrics } from '../../theme';
import { styles } from './styles';
import {useDispatch,useSelector} from 'react-redux';
import {logOut} from '../../redux/actions/AuthenAction'

export default function SettingScreen ({}){
  const user = useSelector(state => state.AuthenReducer.user)
  const dispatch = useDispatch()

  const { navigate } = useNavigation();

  const itemMenu = (name, onPress) => {
    return (
      <TouchableOpacity style={styles.rowMenu} onPress={onPress}>
        <Text style={styles.textMenu} bold fontSize={16}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:AppMetrics.marginLeft,marginVertical:AppMetrics.marginLeft}}>
           <Image
              source={user.avatar || AppImgSrcs.ic_user}
              style={{width:(50),height:(50),borderRadius:25}}
           />
           <Text style={{fontSize:20,fontWeight:'bold',flex:1,marginLeft:AppMetrics.marginLeft}}>{user.name}</Text>
        </View>
        <View style={styles.wrapMenu}>
            {itemMenu("Khuôn mặt",()=>navigate('FaceScreen'))}
            {itemMenu("Thông tin cá nhân",()=>navigate('Info'))}
            {itemMenu("Công ty",()=>navigate('UserCompany'))}
            {itemMenu("Đăng xuẩt",()=>dispatch(logOut()))}
        </View>
      </ScrollView>
     
    </SafeAreaView>
  );
};

