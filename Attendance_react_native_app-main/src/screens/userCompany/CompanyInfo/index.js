import React, { useState } from "react";
import { styles } from "./style";
import {
  PermissionsAndroid,
  ToastAndroid,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { AppMetrics } from "../../../theme";

export default function CompayInfo({ companyLocation, companyAddress }) {
  return (
    <View>
      <Text
        style={{
          marginHorizontal: AppMetrics.marginLeft,
          marginVertical: AppMetrics.marginLeft,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {"Vị trí công ty"}
      </Text>

      <View style={styles.container}>
        <MapView
          style={styles.mapcontainer}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: companyLocation.lat,
            longitude: companyLocation.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={styles.mapStyle}
        >
          <Marker
            pinColor="red"
            draggable
            coordinate={{
              latitude: companyLocation.lat,
              longitude: companyLocation.long,
            }}
            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
            title={"Công Ty LuanNT"}
            description={""}
          />
        </MapView>
      </View>

      <Text
        style={{
          marginHorizontal: AppMetrics.marginLeft,
          marginVertical: AppMetrics.marginLeft,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {"Địa chỉ công ty: "} <Text>{companyAddress}</Text>
      </Text>
    </View>
  );
}
