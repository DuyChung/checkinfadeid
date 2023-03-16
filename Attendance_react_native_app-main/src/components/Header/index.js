import React from 'react';
import { Image, TouchableWithoutFeedback, View,Text } from 'react-native';
import { styles } from './styles';
import {AppImgSrcs,AppColors,AppMetrics} from '../../theme'

function  Header ({title,goBack,headerRight}) {
  
  return (
    <View style={[styles.container,{borderBottomWidth:1}]}>
        <View style={{flex:1}}>
          {
            goBack && <TouchableWithoutFeedback
            onPress={goBack}
            >
              <Image source={AppImgSrcs.ic_back} style={styles.backIcon} />
            </TouchableWithoutFeedback>
          }
        </View>
        <Text numberOfLines={1} style={{flex:5,textAlign:'center',fontWeight:'bold',fontSize:(20)}}>{title}</Text>
        {
          headerRight?headerRight
        :
        <View style={{flex:1}}/>
        }
    </View>
  );
};

export default Header;
