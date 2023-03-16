import React from 'react'
import { StyleSheet, Text, View,FlatList,TouchableOpacity,RefreshControl} from 'react-native'
import {ListEmptyComponent} from '../../../components'
import {AppImgSrcs,AppColors,AppMetrics} from '../../../theme'
import moment from 'moment'

export default function ListItem({data,navigation,refreshing,onRefresh}) {

    const _renderItem = (item) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("ShiftsDetail",{data:item})}
          onTouchEnd={() => {}}
          style={styles.row}
        >
          <Text>{item.name}</Text>
          <Text>{item.time_start+ " - "+item.time_end}</Text>
        </TouchableOpacity>
      );

    return (
        <View style={{ flex: 1, marginTop:10 }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={data}
          renderItem={({ item }) => _renderItem(item)}
          ListEmptyComponent={<ListEmptyComponent title="Chưa có ca làm nào" />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    )
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        marginHorizontal:AppMetrics.marginLeft,
        justifyContent:'space-between',
        backgroundColor:AppColors.white,
        paddingVertical:(10),
        marginBottom:(10),
        paddingHorizontal:AppMetrics.marginLeft,
        borderRadius:(10)
      },
})
