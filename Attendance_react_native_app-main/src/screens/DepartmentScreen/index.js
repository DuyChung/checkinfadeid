import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AppImgSrcs, AppMetrics } from "../../theme";
import { Header, Button, Modal, TextField, Checkbox } from "../../components";
import { styles } from "./style";
import shiftsController from "../../controller/shiftsController";
import { useSelector } from "react-redux";
import employeeController from "../../controller/employeeController";
import roomController from "../../controller/roomController";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";
import ListItem from "./ListItem";

export default function ShiftsScreen({ navigation }) {
  const [showModal, setshowModal] = useState(false);
  const [name, setname] = useState("");
  const [arr_shifts, setarr_shifts] = useState([]);
  const [arr_employee, setarr_employee] = useState([]);
  const [loading, setloading] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [isShowShifts, setisShowShifts] = useState(false);
  const [isShowEmployee, setisShowEmployee] = useState(false);
  const [isshiftsCheck, setisshiftsCheck] = useState([]);
  const [ischeckuser, setischeckuser] = useState([]);
  const [data, setdata] = useState([]);

  const user = useSelector((state) => state.AuthenReducer.user);

  let _unsubcribe=null;
  useEffect(() => {
    _unsubcribe = navigation.addListener("focus", () => {
      getDepartment();
      getShiftsList();
      getEmployeeList();
    });
   
  }, []);

  const getShiftsList = async () => {
    const response = await shiftsController.getShiftsList(user.company_id);
    const { code, data } = response;
    if (code == 200 && data) {
      setarr_shifts(data);
    }
  };

  const getEmployeeList = async () => {
    const response = await employeeController.getUserList(user.company_id);
    const { code, data } = response;
    if (code == 200 && data) {
      setarr_employee(data);
    }
  };

  const onchange = (type, value) => {
    switch (type) {
      case "name":
        setname(value);
        break;

      default:
        break;
    }
  };

  const onShiftsCheck = (shift) => {
    const check = isshiftsCheck.some(
      (item) => item.shifts_code == shift.shifts_code
    );
    if (check == false) {
      setisshiftsCheck(isshiftsCheck.concat(shift));
    } else {
      setisshiftsCheck(
        isshiftsCheck.filter((item) => item.shifts_code !== shift.shifts_code)
      );
    }
  };

  const isShiftsChecked = (index) => {
    const check = isshiftsCheck.some((item) => item.shifts_code == index);
    if (check == true) {
      return true;
    } else return false;
  };

  const onUserCheck = (user) => {
    const check = ischeckuser.some((item) => item == user);
    if (check == false) {
      setischeckuser(ischeckuser.concat(user));
    } else {
      setischeckuser(
        ischeckuser.filter((item) => item !== user)
      );
    }
  };

  const isChecked = (index) => {
    const check = ischeckuser.some((item) => item == index);
    if (check == true) {
      return true;
    } else return false;
  };

  const renderBody = () => {
    return (
      <ScrollView>
        <TextField
          title={"Tên phòng ban"}
          value={name}
          onChangeText={onchange.bind(this, "name")}
        />
        <TouchableOpacity
          onPress={() => setisShowShifts(!isShowShifts)}
          style={styles.dropdow}
        >
          <Text style={styles.content}>{"Ca làm"}</Text>
          <Image source={AppImgSrcs.ic_down} resizeMode="center" />
        </TouchableOpacity>

        {isShowShifts && (
          <FlatList
            data={arr_shifts}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: AppMetrics.marginLeft * 2,
                  marginBottom: 5,
                }}
              >
                <Checkbox
                  onPress={() => onShiftsCheck(item)}
                  check={isShiftsChecked(item.shifts_code)}
                />
                <Text>{item.name}</Text>
              </View>
            )}
          />
        )}

        <TouchableOpacity
          onPress={() => setisShowEmployee(!isShowEmployee)}
          style={styles.dropdow}
        >
          <Text style={styles.content}>{"Nhân viên"}</Text>
          <Image source={AppImgSrcs.ic_down} resizeMode="center" />
        </TouchableOpacity>
        {isShowEmployee && (
          <FlatList
            data={arr_employee}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: AppMetrics.marginLeft * 2,
                  marginBottom: 5,
                }}
              >
                <Checkbox
                  onPress={() => onUserCheck(item.user_id)}
                  check={isChecked(item.user_id)}
                />
                <Text>{item.name}</Text>
              </View>
            )}
          />
        )}
      </ScrollView>
    );
  };

  const submit = async () => {
    if (!name) {
      Alert.alert("", "Vui lòng nhập tên phòng ban");
    } else {
      setloading(true);
      let params = {
        name: name,
        shifts: isshiftsCheck,
        employees: ischeckuser,
        company_id: user.company_id,
        department_id:Math.random()
      };
      console.log('==========parasm====',params)
      const respome = await roomController.addroom(params);
      if (respome.code == 200) {
        
        setloading(false);
        setshowModal(false);
        Toast.show({
          text1: "Face attendance",
          text2: "Thêm thành công",
        });
        getDepartment();
      } else {
        setloading(false);
        Toast.show({
          type: "error",
          text1: "Face attendance",
          text2: "Thất bại",
        });
      }
    }
  };

  const getDepartment = async () => {
    setrefreshing(true);
    const respone = await roomController.getDepartmentList(user.company_id);
    const { code, data } = respone;
    if (code == 200 && data) {
      setdata(data);
      setrefreshing(false);
    } else {
      setdata([]);
      setrefreshing(false);
    }
  };
  const onRefresh = () => {
    getDepartment();
  };
  return (
    <View style={{ flex: 1 }}>
      <Header title={"Phòng ban"} goBack={() => navigation.goBack()} />
      {refreshing ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" />
      ) : (
        <ListItem
          data={data}
          navigation={navigation}
          refreshing={refreshing}
          onRefresh={() => onRefresh()}
        />
      )}
      <Button
        style={styles.button}
        title={"Thêm"}
        onPress={() => setshowModal(true)}
      />

      <Modal
        title="Thêm phòng ban"
        isVisible={showModal}
        renderBody={() => renderBody()}
        onClose={() => setshowModal(false)}
        onRight={() => submit()}
        onLeft={() => setshowModal(false)}
        loading={loading}
      />
    </View>
  );
}
