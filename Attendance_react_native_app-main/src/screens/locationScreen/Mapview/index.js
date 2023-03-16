import React, { useState } from "react";
import { styles } from "./style";
import { PermissionsAndroid, ToastAndroid, TouchableOpacity, View,Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapViewScreen({ location }) {

  const hasLocationPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        "Location permission denied by user.",
        ToastAndroid.LONG
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        "Location permission revoked by user.",
        ToastAndroid.LONG
      );
    }

    return false;
  };
  let lat = 0;
  let long = 0;
  if (location) {
    lat = location.lat;
    long = location.long;
  }

  return (
      <View style={styles.container}>
        <MapView
          style={styles.mapcontainer}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: lat,
            longitude: long,
            latitudeDelta: lat,
            longitudeDelta: long,
          }}
          customMapStyle={styles.mapStyle}
        >
          <Marker
            pinColor="green"
            draggable
            coordinate={{
              latitude: lat,
              longitude: long,
            }}
            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
            title={"LuanNT"}
            // description={"This is a description of the marker"}
          />
        </MapView>
      </View>
  );
}
