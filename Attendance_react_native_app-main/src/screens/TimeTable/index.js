import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { AppColors, AppImgSrcs, AppMetrics } from "../../theme";
import { Header,MonthPicker } from "../../components";
import { styles } from "./styles";

export default function TimeTable({ navigation }) {
  const [date, setdate] = useState(new Date());
  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <View style={styles.date}>
          <Text style={{ color: AppColors.white, fontWeight: "bold" }}>
            {date.getDate()}
          </Text>
        </View>

        <View style={{ flex: 1,backgroundColor:AppColors.white,paddingVertical:20,paddingHorizontal:20,borderRadius:10,marginLeft:AppMetrics.marginLeft }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>{"Ca hành chính"}</Text>
            <Text>{"08:00-17:00"}</Text>
          </View>
        </View>
      </View>
    );
  };
  const onChangeDate = (date) => {
    setdate(date);
  };
  return (
    <View style={{ flex: 1 }}>
      <Header title={"Lịch công việc"} goBack={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <MonthPicker onChangeDate={onChangeDate.bind(this)} />
        <FlatList
          data={[{}, {}, {}, {}, {}]}
          renderItem={({ item }) => _renderItem(item)}
        />
      </View>
    </View>
  );
}
