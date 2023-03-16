import React from 'react'
import { StyleSheet, Text, View,FlatList,TouchableOpacity,RefreshControl,Image} from 'react-native'
import {ListEmptyComponent} from '../../../components'
import {AppImgSrcs,AppColors,AppMetrics} from '../../../theme'

export default function ListItem({data,navigation,refreshing,onRefresh}) {

    const _renderItem = (item) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("EmployeeDetail",{data:item})}
          style={styles.row}
        >
          <Image
            source={item.avatar||AppImgSrcs.ic_user}
            style={styles.avatar}
          />
          <Text>{item.name}</Text>
        </TouchableOpacity>
      );

    return (
        <View style={{ flex: 1, marginTop:10 }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={data}
          renderItem={({ item }) => _renderItem(item)}
          ListEmptyComponent={<ListEmptyComponent title="Chưa có nhân viên nào" />}
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
        backgroundColor:AppColors.white,
        paddingVertical:(10),
        marginBottom:(10),
        paddingHorizontal:AppMetrics.marginLeft,
        borderRadius:(10),
        alignItems:'center'
      },
      avatar:{
        width:40,
        height:40,
        borderRadius:20,
        marginRight:10
      }
})
