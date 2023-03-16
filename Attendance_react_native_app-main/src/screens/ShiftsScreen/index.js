import React, { useState,useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";
import {AppMetrics } from "../../theme";
import {
  Header,
  Button,
  Modal,
  TextField,
  TimePicker,
  Checkbox,
} from "../../components";
import { styles } from "./styles";
import {useSelector} from 'react-redux'
import shiftsController from '../../controller/shiftsController'
import moment from 'moment'
import ListItem from './ListItem'
import { ActivityIndicator } from "react-native";
import Toast from 'react-native-toast-message'

export default function ShiftsScreen({ navigation }) {
  const [wokingDay, setwokingDay] = useState(1);
  const [time_in_Show, settime_in_Show] = useState(false);
  const [time_out_Show, settime_out_Show] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [timein, settimein] = useState(new Date());
  const [timeout, settimeout] = useState(new Date());
  const [arrDate_in_week, setarrDate_in_week] = useState([]);
  const [shifts_name, setshifts_name] = useState("");
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState([])
  const [refreshing, setrefreshing] = useState(false)
  

  const user = useSelector(state => state.AuthenReducer.user)
  let _unsubcribe =null;
  useEffect(() => {
    _unsubcribe=navigation.addListener('focus',()=>{
      getShiftsList();
    })
   
  }, [])


  const date_in_week = [
    { date: "Thứ 2", index: 'Monday' },
    { date: "Thứ 3", index: 'Tuesday' },
    { date: "Thứ 4", index: 'Wednesday' },
    { date: "Thứ 5", index: 'Thursday' },
    { date: "Thứ 6", index: 'Friday' },
    { date: "Thứ 7", index: 'Saturday' },
    { date: "Chủ nhật", index: 'Sunday' },
  ];
const submit= async()=>{
  setloading(true)
  let params = {
    name:shifts_name,
    working_day:wokingDay,
    time_start:moment(timein).format('HH:mm'),
    time_end:moment(timeout).format('HH:mm'),
    date_in_week:arrDate_in_week,
    company_id:user.company_id,
  }
  if(!shifts_name){
    Toast.show({
      type:'error',
      text1:'Face attendance',
      text2:'Tên ca làm không được để trống'
    })
    setloading(false)
  }else if(arrDate_in_week.length==0){
    Toast.show({
      type:'error',
      text1:'Face attendance',
      text2:'Cần chọn ít nhất 1 ngày trong tuần'
    })
    setloading(false)
  }
  if(shifts_name && arrDate_in_week.length!==0){
    const response = await shiftsController.addShifts(params)
    const {code,data}= response
    if(code==200 && data){
      Toast.show({
        
        text1:'Face attendance',
        text2:'Thêm ca làm thành công'
      })
      setloading(false)
      setshowModal(false)
      getShiftsList();
    }
    else{
      Toast.show({
        type:'error',
        text1:'Face attendance',
        text2:'Thêm ca làm thất bại'
      })
      setloading(false)
      setshowModal(false)
    }
  }
}

  const onchange = (type, value) => {
    switch (type) {
      case "time_in":
        settime_in_Show(false)
        settimein(value);
        break;

      case "time_out":
        settime_out_Show(false)
        settimeout(value);
        break;

      case "wokingday":
        setwokingDay(value);
        break;

      case "shifts_name":
        setshifts_name(value);
        break;

      default:
        break;
    }
  };

  const onPressCheck = (index) => {
    const check = arrDate_in_week.some((item) => item == index);
    if (check == false) {
      setarrDate_in_week(arrDate_in_week.concat(index));
    } else {
      setarrDate_in_week(arrDate_in_week.filter((item) => item !== index));
    }
  };

  const isChecked = (index) => {
    const check = arrDate_in_week.some((item) => item == index);
    if (check == true) {
      return true;
    } else return false;
  };
  const renderBody = () => {
    return (
      <ScrollView>
        <TextField
          title={"Tên ca làm"}
          value={shifts_name}
          onChangeText={onchange.bind(this, "shifts_name")}
        />
        <TextField
          title={"Số ngày công"}
          value={`${wokingDay}`}
          onChangeText={onchange.bind(this, "wokingday")}
          keyboardType="number-pad"
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: AppMetrics.marginLeft,
          }}
        >
          <Text>{"Vào ca"}</Text>
          <TimePicker
            style={styles.timepicker}
            onPress={() => settime_in_Show(true)}
            time={timein}
            open={time_in_Show}
            onConfirm={onchange.bind(this, "time_in")}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: AppMetrics.marginLeft,
          }}
        >
          <Text>{"Tan ca"}</Text>
          <TimePicker
            style={styles.timepicker}
            onPress={() => settime_out_Show(true)}
            time={timeout}
            open={time_out_Show}
            onConfirm={onchange.bind(this, "time_out")}
          />
        </View>

        <Text>{"Ngày trong tuần"}</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginVertical: AppMetrics.marginLeft,
          }}
        >
          {date_in_week.map((item) => (
            <View
              style={{
                flexDirection: "row",
                marginLeft: AppMetrics.marginLeft,
                marginBottom: 10,
              }}
            >
              <Text>{item.date}</Text>
              <Checkbox
                check={isChecked(item.index)}
                onPress={() => onPressCheck(item.index)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  const getShiftsList = async()=>{
    setrefreshing(true)
    const response = await shiftsController.getShiftsList(user.company_id)
    const {code,data} = response
    if(code==200&&data){
      setdata(data)
      setrefreshing(false)
    }
    else{
      setdata([])
      setrefreshing(false)
    }
  }

  const onRefresh=()=>{
    getShiftsList();
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Ca làm việc"} goBack={() => navigation.goBack()} />
      {
        refreshing?<ActivityIndicator style={{flex:1}} size='large'/>
        : <ListItem
        data={data}
        navigation={navigation}
        refreshing={refreshing}
        onRefresh={()=>onRefresh()}
       />
      }
      
      <Modal
        title="Thêm ca làm"
        isVisible={showModal}
        renderBody={() => renderBody()}
        onClose={() => setshowModal(false)}
        onRight={()=>submit()}
        onLeft={()=>setshowModal(false)}
        loading={loading}
      />
      <Button
        style={styles.button}
        title={"Thêm"}
        onPress={() => setshowModal(true)}
      />
    </View>
  );
}
