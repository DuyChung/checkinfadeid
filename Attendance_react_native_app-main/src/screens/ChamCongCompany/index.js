import React, { useState, useEffect } from "react";
import {
  View,
} from "react-native";
import {
  Header,
} from "../../components";
import { useSelector } from "react-redux";
import ListItem from "./ListItem";
import { ActivityIndicator } from "react-native";
import employeeController from "../../controller/employeeController";

export default function Employee({ navigation }) {
  const [refreshing, setrefreshing] = useState(false);
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
  const onRefresh = () => {
    getEmployee();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Chọn nhân viên"} goBack={() => navigation.goBack()} />
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
      
    </View>
  );
}
