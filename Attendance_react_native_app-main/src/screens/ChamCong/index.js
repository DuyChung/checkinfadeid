import React, { useState,useEffect } from "react";
import { View, FlatList,ActivityIndicator, RefreshControl, } from "react-native";
import { Header, MonthPicker,ListEmptyComponent, ChamcongComponent} from "../../components";
import { useSelector } from "react-redux";
import ChamCongController from '../../controller/chamCongController'
import moment from 'moment'

export default function ChamCong({ navigation,route }) {
  const [date, setdate] = useState(new Date());
  const [data, setdata] = useState([])
  const user = useSelector((state) => state.AuthenReducer.user);
  const [refreshing, setrefreshing] = useState(false)
  const [loading, setloading] = useState(true)

  let user_id = user.user_id;

  if(route.params && route.params.data){
    user_id=route.params.data.user_id
  }

  useEffect(() => {
    getData(date);
  }, [])

const getData = async(date)=>{
  setrefreshing(true)
  let params = {
    user_id:user_id,
    monthyear:moment(date).format('MM/YYYY')
  }
  const response = await ChamCongController.getHistory(params)
  const {code,data}=response
  if(code==200 && data){
    setdata(data)
    setrefreshing(false)
    setloading(false)
  }
  else{
    setdata([])
    setrefreshing(false)
    setloading(false)
  }
}

const onRefresh=()=>{
  getData();
}
  const _renderItem = (item) => {
    return <ChamcongComponent
      data={item}
    />
  };
  const onChangeDate = (date) => {
    setdate(date);
    getData(date)
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Bảng Chấm Công"} goBack={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <MonthPicker date ={date} onChangeDate={onChangeDate} />
        {
          loading?<ActivityIndicator size='large'/>
          :
          <FlatList
            data={data}
            renderItem={({ item }) => _renderItem(item)}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          ListEmptyComponent={<ListEmptyComponent title="Lịch sử trống"/>}
        />
        }
        
      </View>
    </View>
  );
}
