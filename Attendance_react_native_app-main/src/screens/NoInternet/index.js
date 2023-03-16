import React from 'react'
import { View, SafeAreaView, Text, Button,Image } from 'react-native'
import {AppImgSrcs,AppColors,AppMetrics} from '../../theme'

export function NoInternet ({ onPress }) {
  return (
    <SafeAreaView style={{ flex: 1,justifyContent:'center' }}>
        <Image
            source={AppImgSrcs.img_noInternet}
            style={{alignSelf:'center',marginBottom:30}}
        />
      <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}> 
        <Text style={{fontSize: 30}}>Mất kết nối mạng</Text>
        <Button color={AppColors.green} onPress={onPress} title='Thử lại'/>
      </View>
    </SafeAreaView>
  );
}