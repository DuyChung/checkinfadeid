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
import { AppColors, AppImgSrcs, AppMetrics } from "../../theme";
import { Header, Button, TextField, Modal } from "../../components";
import { styles } from "./style";
import roomController from "../../controller/roomController";
import Swipeout from "react-native-swipeout";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import userComtroller from "../../controller/employeeController";
import Icon from "react-native-vector-icons/FontAwesome";
import shiftsController from "../../controller/shiftsController";

export default function ShiftsDetail({ navigation, route }) {
  let item;
  if (route.params.data) {
    item = route.params.data;
  }
  const [name, setname] = useState(item.name);
  const [arr_employee, setarr_employee] = useState([]);
  const [arr_shifts, setarr_shifts] = useState([]);
  const [loading, setloading] = useState(false);
  const [deleteloading, setdeleteloading] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [showModal_shifts, setshowModal_shifts] = useState(false);
  const [user_List, setuser_List] = useState([]);
  const [shifts_list, setshifts_list] = useState([]);
  const [loading_add, setloading_add] = useState(false);
  const [itemClick, setitemClick] = useState('')

  const user = useSelector((state) => state.AuthenReducer.user);

  useEffect(() => {
    getDetail();
    getUserList();
    getAllUser();
    getAllShifts();
  }, []);

  const getDetail = async()=>{
    let params = {
      company_id:user.company_id,
      department_id:item.department_id
    }
    const response = await roomController.getDepartmentDetail(params)
    const {code,data}= response
    if(code==200&&data){
      setarr_shifts(data[0].shifts)
    }
  }
  const getAllUser = async () => {
    const response = await userComtroller.getUserList(user.company_id);
    const { code, data } = response;
    if (code == 200 && data) {
      setuser_List(data);
    }
  };

  const getAllShifts = async () => {
    const response = await shiftsController.getShiftsList(user.company_id);
    const { code, data } = response;
    if (code == 200 && data) {
      setshifts_list(data);
    }
  };
  const getUserList = async () => {
    const response = await roomController.getUserListByDepartment(
      item.department_id,
      user.company_id
    );
    const { code, data } = response;
    if (code == 200 && data) {
      setarr_employee(data);
    }
  };

  const onchange = (name) => {
    setname(name);
  };

  const onDeleteShifts = async (shifts) => {
    let params = {
      department_id: item.department_id,
      company_id: user.company_id,
      shifts: shifts,
    };
    const response = await roomController.deleteShiftsInDepartment(params);
    if (response.code == 200) {
      getDetail();
      Toast.show({
        text1: "Face attendance",
        text2: `Đã xoá ${shifts.name} khỏi phòng phòng`,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Face attendance",
        text2: "Đã có lỗi xảy ra, vui lòng kiểm tra lại",
      });
      setloading_add(false);
    }
  };

  const onDeleteUser = async (id, name) => {
    let params = {
      department_id: item.department_id,
      company_id: user.company_id,
      user_id: id,
    };
    const response = await roomController.deleteUserInDepartment(params);
    if (response.code == 200) {
      getUserList();
      getAllUser();
      Toast.show({
        text1: "Face attendance",
        text2: `Đã xoá ${name} ra khỏi phòng`,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Face attendance",
        text2: "Đã có lỗi xảy ra, vui lòng kiểm tra lại",
      });
    }
  };

  const editename = async () => {
    let params = {
      name: name,
      company_id: user.company_id,
      department_id: item.department_id,
    };
    const response = await roomController.editDepartment(params);
    if (response.code == 200) {
      Toast.show({
        text1: "Face attendance",
        text2: "Đã cập nhật phòng ban",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Face attendance",
        text2: "Đã có lỗi xảy ra, vui lòng kiểm tra lại",
      });
    }
  };

  const deleteRoom = async () => {
    setdeleteloading(true);
    let params = {
      company_id: user.company_id,
      department_id: item.department_id,
    };
    const response = await roomController.deleteDepartment(params);
    if (response.code == 200) {
      Toast.show({
        text1: "Face attendance",
        text2: "Đã xoá phòng ban",
      });
      navigation.goBack();
      setdeleteloading(false);
    } else {
      Toast.show({
        text1: "Face attendance",
        text2: "Đã có lỗi xảy ra, vui lòng thử lại",
      });
      setdeleteloading(false);
    }
  };

  const addUser = async (user_id, name) => {
    let params = {
      department_id: item.department_id,
      company_id: user.company_id,
      user_id: user_id,
    };
    setloading_add(true);
    const response = await roomController.addUserInDepartment(params);
    if (response.code == 200) {
      setloading_add(false);
      getAllUser();
      getUserList();
      Toast.show({
        text1: "Face attendance",
        text2: `Đã thêm ${name} vào phòng`,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Face attendance",
        text2: "Đã có lỗi xảy ra, vui lòng kiểm tra lại",
      });
      setloading_add(false);
    }
  };

  const addShifts = async (shifts) => {
    setloading_add(true)
    setitemClick(shifts.shifts_code)
    let params = {
      department_id: item.department_id,
      company_id: user.company_id,
      shifts: shifts,
    };
    const response = await roomController.addShiftsInDepartment(params);
    if (response.code == 200) {
      getDetail();
      Toast.show({
        text1: "Face attendance",
        text2: `Đã thêm ${shifts.name} vào phòng phòng`,
      });
      setloading_add(false)

    } else {
      Toast.show({
        type: "error",
        text1: "Face attendance",
        text2: "Đã có lỗi xảy ra, vui lòng kiểm tra lại",
      });
      setloading_add(false);
    }
  };

  const renderBody = () => {
    return (
      <FlatList
        style={{ marginTop: 20 }}
        data={user_List}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => addUser(item.user_id, item.name)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: AppMetrics.marginLeft,
            }}
          >
            {loading_add == true ? (
              <ActivityIndicator color={AppColors.green} />
            ) : item.department_id !== null ? (
              <Icon name="check" color={AppColors.green} size={25} />
            ) : null}
            <Image
              source={item.avatar || AppImgSrcs.ic_user}
              style={[styles.avatar, { marginLeft: 5 }]}
            />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

 const renderBody_shifts = (arr_shifts) => {
    return(
      <FlatList
          style={{ marginTop: 20 }}
          data={shifts_list}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => addShifts(item)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: AppMetrics.marginLeft,
              }}
            >
              {loading_add == true && itemClick==item.shifts_code? (
                <ActivityIndicator color={AppColors.green} />
              ) : arr_shifts.some(data=>data.shifts_code==item.shifts_code) == true ? (
                <Icon name="check" color={AppColors.green} size={25} />
              ) : null}
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
      />
    )
    
  };

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.white }}>
      <Header title={"Chi tiết phòng ban"} goBack={() => navigation.goBack()} />
      <ScrollView style={{ marginTop: 30 }}>
        <TextField
          title={"Tên phòng ban"}
          value={name}
          onChangeText={onchange.bind(this)}
          onEndEditing={()=>editename()}
        />

        <Text style={styles.title}>{"Nhân viên"}</Text>
        <FlatList
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: AppColors.grayLabel }}>
              {"Chưa có nhân viên"}
            </Text>
          }
          data={arr_employee}
          renderItem={({ item }) => (
            <Swipeout
              backgroundColor="white"
              right={[
                {
                  text: "xoá",
                  onPress: () => {
                    onDeleteUser(item.user_id, item.name);
                  },
                  backgroundColor: "red",
                },
              ]}
            >
              <View style={styles.rowItem}>
                <Image
                  source={item.avatar || AppImgSrcs.ic_user}
                  style={styles.avatar}
                />
                <Text>{item.name}</Text>
              </View>
            </Swipeout>
          )}
        />
        <TouchableOpacity
          onPress={() => setshowModal(true)}
          style={{ flexDirection: "row", alignSelf: "center" }}
        >
          <Text style={styles.add}>{"Thêm +"}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{"Ca làm"}</Text>
        <FlatList
          data={arr_shifts}
          style={{ marginTop: 10 }}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: AppColors.grayLabel }}>
              {"Chưa có ca làm nào"}
            </Text>
          }
          renderItem={({ item }) => (
            <Swipeout
              backgroundColor="white"
              right={[
                {
                  text: "xoá",
                  onPress: () => {
                    onDeleteShifts(item);
                  },
                  backgroundColor: "red",
                },
              ]}
            >
              <View style={styles.shiftsitem}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {item.name}
                </Text>
              </View>
            </Swipeout>
          )}
        />

        <TouchableOpacity
          onPress={() => setshowModal_shifts(true)}
          style={{ flexDirection: "row", alignSelf: "center" }}
        >
          <Text style={styles.add}>{"Thêm +"}</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.renderbutton}>
        {/* <Button
          style={styles.button}
          title={"Lưu"}
          loading={loading}
          onPress={() => submit()}
        /> */}
        <Button
          style={[styles.button, { backgroundColor: "red" }]}
          title={"Xoá"}
          onPress={() => deleteRoom()}
          loading={deleteloading}
        />
      </View>

      <Modal
        title="Thêm nhân viên"
        isVisible={showModal}
        renderBody={() => renderBody()}
        onClose={() => setshowModal(false)}
        loading={loading}
        showButton={false}
      />

      <Modal
        title="Thêm ca làm"
        isVisible={showModal_shifts}
        renderBody={() => renderBody_shifts(arr_shifts)}
        onClose={() => setshowModal_shifts(false)}
        loading={loading}
        showButton={false}
      />
    </View>
  );
}
