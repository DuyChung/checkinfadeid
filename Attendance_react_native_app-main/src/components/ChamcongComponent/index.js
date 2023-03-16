import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {AppColors,AppMetrics,AppImgSrcs} from '../../theme'
export default function ChamcongComponent({data}) {
    return (
        <View style={styles.item}>
        <View style={styles.date}>
          <Text style={{ color: AppColors.white, fontWeight: "bold" }}>
            {data.date.slice(0,2)}
          </Text>
        </View>

        <View style={{ flex: 1,backgroundColor:AppColors.white,paddingVertical:20,paddingHorizontal:20,borderRadius:10,marginLeft:AppMetrics.marginLeft }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>{data.shifts.name}</Text>
            <Text>{data.shifts.time_start+":"+data.shifts.time_end}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop:20,
              borderTopWidth:1,
              paddingTop:10,
              borderTopColor:AppColors.grayAlto
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {
                data.time_in&& <View style={{ flexDirection: "row",marginRight:5 }}>
                <Image source={AppImgSrcs.ic_checkin} style={styles.icon} />
                <Text>{data.time_in}</Text>
              </View>
              }
              
             {
               data.time_out&& <View style={{ flexDirection: "row" }}>
               <Image source={AppImgSrcs.ic_checkout} style={styles.icon} />
               <Text>{data.time_out}</Text>
             </View>
             }
             
            </View>
            <Text style={{marginHorizontal:10}}>{data.status}</Text>
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        marginHorizontal: 10,
        alignItems: "center",
        marginTop: 10,
      },
      date:{
        backgroundColor:AppColors.green,
        borderRadius:(25),
        width:(50),
        height:(50),
        alignItems:'center',
        justifyContent:'center'
      },
      icon:{
        width:(20),
        height:(20),
      }
})
