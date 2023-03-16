import React from "react";
import { Alert, StyleSheet, Text, View,Image, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import TextField from '../Textfield'
import moment from 'moment';
import { AppImgSrcs, AppMetrics } from "../../theme";
export default function DatimePicker({date,onConfirm,title,style,onPress,open}) {
  return (
    <View>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) =>onConfirm(date)}
        onCancel={() => {}}
      />
      <View style={[styles.container,style]}>
         <Text style={{marginBottom:10}}>{title||''}</Text>
         <View onTouchEnd={onPress} style={styles.textfield}>
           <Text>{moment(date).format('DD/MM/YYYY')}</Text>
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
