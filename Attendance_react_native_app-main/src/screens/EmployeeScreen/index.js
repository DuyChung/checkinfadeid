import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppColors, AppImgSrcs, AppMetrics } from "../../theme";
import {
  Header,
  ListEmptyComponent,
  Button,
  Modal,
  TextField,
  TimePicker,
  Checkbox,
  SearchBar,
} from "../../components";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import shiftsController from "../../controller/shiftsController";
import { Alert } from "react-native";
import moment from "moment";
import ListItem from "./ListItem";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import employeeController from "../../controller/employeeController";

export default function Employee({ navigation }) {
  const [showModal, setshowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [employee, setemployee] = useState([]);
  const [valueSearch, setvalueSearch] = useState("");
  const [arrchecked, setarrchecked] = useState([])
  const [searching, setsearching] = useState(false)
  const [user_id, setuser_id] = useState('')
  const [data, setdata] = useState([])

  const user = useSelector((state) => state.AuthenReducer.user);
  let _unsubcribe = null;
  useEffect(() => {
    _unsubcribe = navigation.addListener("focus", () => {
      getEmployee();
    });
  }, []);

  
  const getEmployee = async()=>{
    setrefreshing(true)
    const response = await employeeController.getUserList(user.company_id)
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

  const findUser = async () => {
    setsearching(true)
    const response = await employeeController.findUserById(valueSearch);
    const { code, data } = response;
    if (code == 200 && data) {
      setsearching(false)
      setemployee(data);
    } else {
      setsearching(false)
      setemployee([]);
    }
  };

  const submit = async () => {
    setloading(true);
  
    if (arrchecked.length == 0) {
      Toast.show({
        type: "error",
        text1: "Face attendance",
        text2: "Cần chọn ít nhất 1 đối tượng",
      });
      setloading(false);
    }
    if (arrchecked.length !== 0) {
      const response = await employeeController.addEmployee(user_id,user.company_id);
      const { code, data } = response;
      if (code == 200 && data) {
        Toast.show({
          text1: "Face attendance",
          text2: "Đã thêm vào danh sách nhân viên",
        });
        setloading(false);
        setshowModal(false);
        setemployee([])
        setvalueSearch('')
      } else {
        Toast.show({
          type: "error",
          text1: "Face attendance",
          text2: "Thất bại",
        });
        setloading(false);
        setshowModal(false);
      }
    }
  };

  const onchange = (type, value) => {
    switch (type) {
      case "value_search":
        setvalueSearch(value);
        break;

      default:
        break;
    }
  };

  const onPressCheck = (index,company_id) => {
    if(company_id==user.company_id){
      Alert.alert('','Người này đã ở trong công ty của bạn')
    }
    else{
      const check = arrchecked.some((item) => item == index);
      if (check == false) {
        setarrchecked(arrchecked.concat(index));
        setuser_id(index)
      } else {
        setarrchecked(arrchecked.filter((item) => item !== index));
        setuser_id('')
      }
    }
 
  };

  const isChecked = (index) => {
    const check = arrchecked.some((item) => item == index);
    if (check == true) {
      return true;
    } else return false;
  };

  //nội dung modal
  const renderBody = () => {
    return (
      <>
        <SearchBar
          placeholder={"Nhập số điện thoại"}
          value={valueSearch}
          onChangeText={onchange.bind(this, "value_search")}
          onPressSearch={() => findUser()}
        />
        {
          searching? <ActivityIndicator size='large'/>
          : <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={employee}
          renderItem={({ item }) =>(
            <View style={styles.listuserSearch}>
              <Checkbox
                check={isChecked(item.user_id)}
                onPress={()=>onPressCheck(item.user_id,item.company_id)}
              />
              <Image
                source={item.avatar||AppImgSrcs.ic_user}
                style={styles.avatar}
              />
              <Text>{item.name}</Text>
            </View>
          )}
        />
        }
      </>
    );
  };

  const onRefresh = () => {
    getEmployee();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Nhân viên"} goBack={() => navigation.goBack()} />
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

      <Modal
        title="Thêm nhân viên"
        isVisible={showModal}
        renderBody={() => renderBody()}
        onClose={() => setshowModal(false)}
        onRight={() => submit()}
        onLeft={() => setshowModal(false)}
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
