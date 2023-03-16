import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { ListEmptyComponent } from "../../../components";
import Icon from "react-native-vector-icons/AntDesign";
import {AppColors,AppMetrics} from '../../../theme'

export default function ListItem({ navigation, data, refreshing, onRefresh }) {
  const _renderItem = (item) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DepartmentDetail",{data:item})}
      style={styles.row}
    >
      <Text> {item.name} </Text>
      <Icon name="right" size={20} />
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        renderItem={({ item }) => _renderItem(item)}
        ListEmptyComponent={
          <ListEmptyComponent title="Chưa có phòng ban nào" />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',backgroundColor:AppColors.white,
        marginHorizontal:AppMetrics.marginLeft,
        borderRadius:10,
        marginBottom:10,
        padding:10
    }
});
