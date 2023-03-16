import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { hasNotch,  } from "react-native-utils-";
import { Header } from "../../components";
import { styles } from "./styles";
import { AppImgSrcs, AppColors } from "../../theme";
export default function CompanyScreen({ navigation }) {
  const item = ({icon, title,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.itemwrap}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={styles.icon} source={icon} resizeMode="center" />
            <Text style={styles.title}>{title}</Text>
          </View>
          <Image
            source={AppImgSrcs.ic_arrowRight}
            style={{ width: (20), height: (20) }}
            resizeMode="center"
          />
        </TouchableOpacity>
    );
  };

  return (
    <View>
      <Header title={"Quản lý công ty"} goBack={() => navigation.goBack()}  />
      <View style={styles.container}>

        {item({icon:AppImgSrcs.ic_shifts, title:"Ca làm việc",onPress :()=>navigation.navigate('ShiftsScreen')})}
        <View style={styles.dashlineWrap}>
          <View style={styles.dashline} />
        </View>

        {item({icon:AppImgSrcs.ic_employee, title:"Nhân viên",onPress :()=>navigation.navigate('Employee') })}
        <View style={styles.dashlineWrap}>
          <View style={styles.dashline} />
        </View>

        {item({icon:AppImgSrcs.ic_location, title:"Vị trí",onPress :()=>navigation.navigate('LocationScreen') })}
        <View style={styles.dashlineWrap}>
          <View style={styles.dashline} />
        </View>

        {item({icon:AppImgSrcs.ic_phongban, title:"Phòng ban",onPress :()=>navigation.navigate('DepartmentScreen')})}
        <View style={styles.dashlineWrap}>
          <View style={styles.dashline} />
        </View>

        {item({icon:AppImgSrcs.ic_pay, title:"Chấm công",onPress :()=>navigation.navigate('ChamCongCompany')})}
        
      </View>
    </View>
  );
}
