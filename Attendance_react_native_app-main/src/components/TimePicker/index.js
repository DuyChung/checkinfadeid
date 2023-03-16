import React from "react";
import { Alert, StyleSheet, Text, View,Image, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import TextField from '../Textfield'
import moment from 'moment';
import { AppImgSrcs, AppMetrics } from "../../theme";

export default function TimePicker({time,onConfirm,title,style,onPress,open}) {

  return (
    <View>
      <DatePicker
        modal
        mode='time'
        open={open}
        date={time}
        onConfirm={(time) =>onConfirm(time)}
        is24hourSource='locale'
        onCancel={() => {}}
      />
      <View style={[styles.container]}>
         <Text>{title||''}</Text>
         <View onTouchEnd={onPress} style={style??styles.textfield}>
           <Text style={{marginLeft:AppMetrics.marginLeft}}>{moment(time).format('HH:mm')}</Text>
           <TouchableOpacity
              onPress={onPress}
           >
            <Image
                source={AppImgSrcs.ic_down}
                style={styles.icon}
                resizeMode='center'
            />
           </TouchableOpacity>
           
         </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginHorizontal:AppMetrics.marginLeft,
    marginBottom:10
  },
  textfield:{
    borderWidth:1,
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:13
  },
  icon:{
    width:30,
  }
});
