import React,{useState} from 'react'
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import { AppColors,AppImgSrcs,AppMetrics } from '../../theme'
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
export default function _MonthPicker({onChangeDate,date}) {

  const [show, setShow] = useState(false);

  const onValueChange = (even,newdate)=>{
    const selectedDate = newdate ||date
    setShow(false)
    onChangeDate(selectedDate)
  }
  const showPicker=()=>{
    setShow(true)
  }
  return (
    <View style={{flexDirection:'row'}}>
    <View style={[styles.container,styles]}>
      <Image
        source={AppImgSrcs.ic_lich}
        style={styles.icon}
      />
      <Text style={styles.date}>{ moment(date).format('MM/YYYY')}</Text>
      <TouchableOpacity
      onPress={() => showPicker()}>
      <Image
        source={AppImgSrcs.ic_down}
      />
      </TouchableOpacity>
     
      
    </View>
    {show && (
      <MonthPicker
        onChange={onValueChange}
        value={date}
        locale="ko"
      />
   )}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:AppColors.whiteBackground,
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:(10),
    borderRadius:10,
    marginHorizontal:AppMetrics.marginLeft,
    paddingHorizontal:(20),
    marginVertical:AppMetrics.marginLeft
  },
  icon:{
    width:(30),
    height:(30),
  },
  date:{
    fontSize:17,
    marginHorizontal:AppMetrics.marginLeft
  }
})
