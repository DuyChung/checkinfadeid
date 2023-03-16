import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { AppMetrics } from "../../theme";
import { Header, Button, TextField, Checkbox } from "../../components";
import { styles } from "./styles";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import shiftsController from "../../controller/shiftsController";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

export default function ShiftsDetail({ navigation, route }) {
  const [time_in_Show, settime_in_Show] = useState(false);
  const [time_out_Show, settime_out_Show] = useState(false);
  const [timein, settimein] = useState(new Date());
  const [time_in_State, settime_in_State] = useState(false);
  const [time_out_State, settime_out_State] = useState(false);
  const [timeout, settimeout] = useState(new Date());
  const [editloading, seteditloading] = useState(false);
  const [deleteloading, setdeleteloading] = useState(false);

  const user = useSelector((state) => state.AuthenReducer.user);
  let data;
  if (route.params.data) {
    data = route.params.data;
  }
  const [arrDate_in_week, setarrDate_in_week] = useState(data.date_in_week);
  const [name, setname] = useState(data.name);
  const [working_day, setworking_day] = useState(data.working_day);

  const date_in_week = [
    { date: "Thứ 2", index: 2, name: "Monday" },
    { date: "Thứ 3", index: 3, name: "Tuesday" },
    { date: "Thứ 4", index: 4, name: "Wednesday" },
    { date: "Thứ 5", index: 5, name: "Thursday" },
    { date: "Thứ 6", index: 6, name: "Friday" },
    { date: "Thứ 7", index: 7, name: "Saturday" },
    { date: "Chủ nhật", index: 8, name: "Sunday" },
  ];

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

  const saveChange = async () => {
    seteditloading(true);
    let params = {
      name: name,
      working_day: working_day,
      time_start: moment(timein).format("HH:mm"),
      time_end: moment(timeout).format("HH:mm"),
      date_in_week: arrDate_in_week,
      shifts_code: data.shifts_code,
      company_id: user.company_id,
    };
    const response = await shiftsController.editShifts(params);
    if (response.code == 200) {
      Toast.show({
        text1: "Face attendance",
        text2: "Sửa thành công",
      });
      navigation.goBack();
      seteditloading(false);
    } else {
      Toast.show({
        type: "error",
        text1: "Face attendance",
        text2: "Sửa thất bại",
      });
      seteditloading(false);
    }
  };

  const deleteShift = async () => {
    setdeleteloading(true);
    const response = await shiftsController.deleteShifts(
      user.company_id,
      data.shifts_code
    );
    if (response.code == 200) {
      Toast.show({
        text1: "Face attendance",
        text2: "Xoá thành công",
      });
      setdeleteloading(false);
      navigation.goBack();
    } else {
      setdeleteloading(false);
      Toast.show({
        type: "error",
        text1: "Face attendance",
        text2: "Xoá thất bại",
      });
    }
  };

  const onChangeTimein = (event, selectedDate) => {
    const currentDate = selectedDate || timein;
    settime_in_Show(false);
    settimein(currentDate);
    settime_in_State(true);
  };

  const onChangeTimeout = (event, selectedDate) => {
    const currentDate = selectedDate || timeout;
    settime_out_Show(false);
    settimeout(currentDate);
    settime_out_State(true);
  };

  const onChange = (type, value) => {
    switch (type) {
      case "name":
        setname(value);
        break;
      case "woking_day":
        setworking_day(value);
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Chi tiết ca làm"} goBack={() => navigation.goBack()} />

      <ScrollView
        style={{
          height: "100%",
          marginHorizontal: AppMetrics.marginLeft,
        }}
      >
        <Text style={{ fontSize: 25, marginVertical: 20 }}>TẠO CA</Text>
        <View style={styles.taoca}>
          <TextField
            title={"Tên ca làm"}
            value={name}
            onChangeText={onChange.bind(this, "name")}
          />
          <TextField
            title={"Ngày công"}
            value={`${working_day}`}
            onChangeText={onChange.bind(this, "woking_day")}
            keyboardType="number-pad"
          />

          <View style={[styles.viewtime, { borderBottomWidth: 1 }]}>
            <Text style={styles.text}> Bắt đầu lúc </Text>
            <Text onPress={() => settime_in_Show(true)}>
              {" "}
              {time_in_State
                ? moment(timein.getTime()).format("HH:mm")
                : data.time_start}{" "}
            </Text>
          </View>
          <View style={styles.viewtime}>
            <Text style={styles.text}> Kết thúc lúc </Text>
            <Text onPress={() => settime_out_Show(true)}>
              {" "}
              {time_out_State
                ? moment(timeout.getTime()).format("HH:mm")
                : data.time_end}{" "}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 25, marginVertical: 20 }}>PHÂN CA</Text>
        <View style={styles.phanca}>
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
                check={isChecked(item.name)}
                onPress={() => onPressCheck(item.name)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          marginBottom: AppMetrics.marginLeft,
          justifyContent: "space-between",
          marginHorizontal: AppMetrics.marginLeft,
        }}
      >
        <Button
          style={styles.button}
          title={"Lưu thay đổi"}
          onPress={() => saveChange()}
          loading={editloading}
        />
        <Button
          style={[styles.button, { backgroundColor: "red" }]}
          title={"Xoá"}
          onPress={() => deleteShift()}
          loading={deleteloading}
        />
      </View>

      {time_in_Show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={timein}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeTimein}
        />
      )}

      {time_out_Show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={timeout}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeTimeout}
        />
      )}
    </View>
  );
}
