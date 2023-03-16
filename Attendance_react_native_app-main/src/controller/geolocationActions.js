import Geolocation,{GeolocationError} from '@react-native-community/geolocation';
import Api from '../api/Api'
import {Alert} from 'react-native'
import Permissions, { check, openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions";

const Geolocations = {
  degreesToRadians: (degrees) => {
    return degrees * Math.PI / 180;
},
checkGeolocationPermission: (() => {
  return new Promise(async (resolve, reject) => {
      const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      const status = await check(permission);
     
      switch (status) {
          case RESULTS.UNAVAILABLE:
          case RESULTS.BLOCKED:
              reject(new Error("Bật lên"));
              break;
          case RESULTS.DENIED:
              reject(new Error("Bật lên"));
              break;
          case RESULTS.GRANTED:
              resolve();
              break;
          default:
              reject(new Error(`Error code: ${status}`));
      };
  });
}),
  getLocation:()=>{
    //lấy toạ độ
    return new Promise(async (resolve,reject)=>{
      try {
        Geolocation.getCurrentPosition(async data=>{
          const {latitude,longitude} = data.coords
        let params = {lat:latitude,long:longitude}
        const response = await Api.getLocation(params)
        resolve({params,response})
        },(error) => {
          let customError = error;
          resolve(null)
          reject(customError)
      },
        )

      } catch (error) {
        reject(error)
      }
    })
  },



  //convert GPS to Address
  getAddress:(params)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        const response = await Api.getLocation(params)
        resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
      }
    })
  },

  //tính khoảng cách giữa 2 GPS
  getDistance: (fromGPS, toGPS) => {
    var earthRadiusKm = 6371;

    let lat1 = fromGPS.lat;
    let lon1 = fromGPS.long;
    let lat2 = toGPS.lat;
    let lon2 = toGPS.long;

    var dLat = Geolocations.degreesToRadians(lat2 - lat1);
    var dLon = Geolocations.degreesToRadians(lon2 - lon1);

    lat1 = Geolocations.degreesToRadians(lat1);
    lat2 = Geolocations.degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
},

// Lấy GPS hiện tại bằng địa chỉ
    getGPSByAddress: (address) => {
      return new Promise(async (resolve, reject) => {
          try {
              const data = await Api.getGPS(address);
              const {features}=data
              if (features && features.length > 0) {
                // Nếu có locality thì dùng localtity
                const arrLocalityResults = features.filter(item => item.place_type.length > 0 && item.place_type[0] == 'locality');
                const arrAddressResults = features.filter(item => item.place_type.length > 0 && item.place_type[0] == 'address');
                const arrPoiResults = features.filter(item => item.place_type.length > 0 && item.place_type[0] == 'poi');

                if (arrLocalityResults.length > 0) {
                    resolve(arrLocalityResults[0]);

                } else if (arrAddressResults.length > 0) {
                    resolve(arrAddressResults[0]);

                } else if (arrPoiResults.length > 0) {
                    resolve(arrPoiResults[0]);

                } else {
                    throw new Error('Result locality, poi = 0');
                };

            } else {
                reject(new Error('Result Features = 0'));
            };

          } catch (error) {
              reject(error);
          };
      });
  },

  //lấy địa chỉ công ty
  getCompanyLocation:(company_id)=>{
    //lấy toạ độ
    return new Promise(async (resolve,reject)=>{
      try {
       const response = await Api.getCompayLocation(company_id)
       resolve(response)
      } catch (error) {
        console.log("-----error-----",error)
        reject(error)
      }
    })
  },
  
}
export default Geolocations
