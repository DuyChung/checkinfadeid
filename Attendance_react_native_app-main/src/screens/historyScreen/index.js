import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { AppColors, AppMetrics } from "../../theme";
import { Header, ListEmptyComponent } from "../../components";
import { useSelector } from "react-redux";
import faceController from "../../controller/faceController";

export default function HistoryScreen({ navigation }) {
  const user = useSelector((state) => state.AuthenReducer.user);
  const [data, setdata] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    setrefreshing(true);
    let respone = await faceController.getAttendanceHistory(user.user_id);
    let { code, data } = respone;
    if (code == 200 && data) {
      setdata(data);
      setrefreshing(false);
      setloading(false);
    } else {
      setdata([]);
      setrefreshing(false);
      setloading(false);
    }
  };
  const _renderItem = (item) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text numberOfLines={1} style={{ flex: 1, textAlign: "center" }}>
          {item.date}
        </Text>
        <Text numberOfLines={1} style={{ flex: 0.5, textAlign: "center" }}>
          {item.time}
        </Text>
        <Text numberOfLines={1} style={{ flex: 1, textAlign: "center",backgroundColor:item.status==''?AppColors.green:'red' }}>
          {item.status!==''?item.status:'Đúng giờ'}
        </Text>
        <Text numberOfLines={1} style={{ flex: 0.5, textAlign: "center" }}>
          {item.type == 0 ? "Vào ca" : "Ra ca"}
        </Text>
      </View>
    );
  };

  const onRefresh = () => {
    getHistory();
  };
  console.log('-----data-----',data)

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Lịch sử"} goBack={() => navigation.goBack()} />
      <View style={{ backgroundColor: AppColors.white, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 10,
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ flex: 1, textAlign: "center", borderRightWidth: 1 }}>
            {"Ngày"}
          </Text>
          <Text style={{ flex: 0.5, textAlign: "center", borderRightWidth: 1 }}>
            {"Giờ"}
          </Text>
          <Text style={{ flex: 1, textAlign: "center", borderRightWidth: 1 }}>
            {"Trạng thái"}
          </Text>
          <Text style={{ flex: 0.5, textAlign: "center" }}>{"Loại"}</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={data}
            renderItem={({ item }) => _renderItem(item)}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={<ListEmptyComponent title="Lịch sử trống" />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
