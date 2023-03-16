import React, { useState, useEffect ,useCallback} from "react";
import { View, Text, TouchableOpacity,Linking } from "react-native";

import { styles } from "./styles";
import { Header, Button, SearchBar ,Modal} from "../../components";
import { AppColors, AppMetrics } from "../../theme";
import Mapview from "./Mapview/index";
import { useSelector, useDispatch } from "react-redux";
import geolocationActions from "../../controller/geolocationActions";
import Api from "../../api/Api";
import Toast from "react-native-toast-message";
import { addLocation } from "../../redux/actions/locationAction";
import AndroidOpenSettings from 'react-native-android-open-settings';

export default function App({ navigation }) {
  const [isShow, setisShow] = useState(false);
  const [isShowadd, setisShowadd] = useState(false);
  const [address, setaddress] = useState("");
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.AuthenReducer.user);

  const location = useSelector((state) => state.locationReducer.location);

  const [companyLocation, setcompanyLocation] = useState(location);
  const [showModal, setshowModal] = useState(false)

  const onChangeText = (address) => {
    setaddress(address);
  };

  const getGPS = async () => {
    const response = await geolocationActions.getGPSByAddress(address);
    if (response !== null && response.geometry.coordinates.length == 2) {
      setcompanyLocation({
        name: address,
        location: {
          lat: response.geometry.coordinates[1],
          long: response.geometry.coordinates[0],
        },
      });
    } else if (response.center.length == 2) {
      setcompanyLocation({
        name: address,
        location: {
          long: response.center[0],
          lat: response.center[1],
        },
      });
    }
  };

  const editLocation = async () => {
    setloading(true);
    let params = {
      name: companyLocation.name,
      location: companyLocation.location,
      company_id: user.company_id,
    };
    const response = await Api.editCompayLocation(params);
    const { code, data } = response;
    if (code == 200 && data.length > 0) {
      setcompanyLocation(data[0]);
      dispatch(addLocation(data[0]));
      Toast.show({
        text1: "Face attendance",
        text2: "Sửa thành công",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Face attendance",
        text2: "Đã có lỗi xảy ra, vui lòng thử lại",
      });
    }
    setloading(false);
  };

  const getCurrentLocation = async () => {
    const response = await geolocationActions.getLocation();
    if (response) {
      setcompanyLocation({
        location: response.params,
        name: response.response,
      });
    }
    else{
      setshowModal(true)
    }
  };

  const addCompanyLocation = async () => {
    setloading(true);
    let params = {
      name: companyLocation.name,
      location: companyLocation.location,
      company_id: user.company_id,
    };
    if (
      params.name !== "" &&
      params.location !== null &&
      params.company_id !== ""
    ) {
      const response = await Api.addCompayLocation(params);
      const { code, data } = response;
      if (code == 200 && data) {
        setloading(false);
        Toast.show({
          text1: "Face attendance",
          text2: "Thêm thành công",
        });
        dispatch(addLocation(data));
      } else {
        setloading(false);
        Toast.show({
          type: "error",
          text1: "Face attendance",
          text2: "Đã có lỗi xảy ra, vui lòng thử lại",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Face attendance",
        text2: "Vui lòng chọn vị trí trước",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title={"Vị trí"} goBack={() => navigation.goBack()} />
      <View style={{}}>
        <Text style={styles.title}>{"Thông tin vị trí"}</Text>
        <Mapview location={companyLocation.location} />

        <Text style={styles.title}>
          {"Vị trí Công ty: " + companyLocation.name || ""}
        </Text>

        {companyLocation.name !== "" && companyLocation.location !== null ? (
          <TouchableOpacity
            style={{ marginHorizontal: AppMetrics.marginLeft }}
            onPress={() => setisShow(!isShow)}
          >
            <Text style={{ color: AppColors.green }}>{"Chỉnh sửa"}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ marginHorizontal: AppMetrics.marginLeft }}
            onPress={() => setisShowadd(!isShowadd)}
          >
            <Text style={{ color: AppColors.green }}>{"Thêm vị trí"}</Text>
          </TouchableOpacity>
        )}
      </View>
      {isShow && (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <SearchBar
              placeholder={"Nhập địa chỉ"}
              value={address}
              onChangeText={onChangeText.bind(this)}
              onPressSearch={() => getGPS()}
            />

            <Text
              style={{
                textAlign: "center",
                marginHorizontal: AppMetrics.marginLeft,
                color: "red",
              }}
            >
              {
                "Tìm kiếm bằng địa chỉ sẽ có độ chênh lệch nhất định. Chúng tôi khuyên bạn nên sử dụng vị trí hiện tại để thiết lập vị trí cho công ty"
              }
            </Text>

            <TouchableOpacity
              onPress={() => getCurrentLocation()}
              style={{ alignItems: "center" }}
            >
              <Text style={{ color: AppColors.green }}>
                {"Lấy vị trí hiện tại"}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginHorizontal: AppMetrics.marginLeft,
              marginBottom: 20,
            }}
          >
            <Button
              style={[
                styles.button,
                { backgroundColor: "red", marginRight: 10 },
              ]}
              title="Huỷ"
              onPress={() => setisShow(false)}
            />

            <Button
              style={styles.button}
              title="Lưu"
              loading={loading}
              onPress={() => editLocation()}
            />
          </View>
        </View>
      )}

      {isShowadd && (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <SearchBar
              placeholder={"Nhập địa chỉ"}
              value={address}
              onChangeText={onChangeText.bind(this)}
              onPressSearch={() => getGPS()}
            />

            <Text
              style={{
                textAlign: "center",
                marginHorizontal: AppMetrics.marginLeft,
                color: "red",
              }}
            >
              {
                "Tìm kiếm bằng địa chỉ sẽ có độ chênh lệch nhất định. Chúng tôi khuyên bạn nên sử dụng vị trí hiện tại để thiết lập vị trí cho công ty"
              }
            </Text>

            <TouchableOpacity
              onPress={() => getCurrentLocation()}
              style={{ alignItems: "center" }}
            >
              <Text style={{ color: AppColors.green }}>
                {"Lấy vị trí hiện tại"}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginHorizontal: AppMetrics.marginLeft,
              marginBottom: 20,
            }}
          >
            <Button
              style={[
                styles.button,
                { backgroundColor: "red", marginRight: 10 },
              ]}
              title="Huỷ"
              onPress={() => setisShowadd(false)}
            />

            <Button
              style={styles.button}
              title="Thêm"
              onPress={() => addCompanyLocation()}
              loading={loading}
            />
          </View>
        </View>
        
      )}
       <Modal
        isVisible={showModal}
        renderBody={() => (<Text style={{fontSize:20,textAlign:'center'}}>{'Bật vị trí trên thiết bị của bạn để sử dụng chức năng này'}</Text>)}
        onClose={() =>{setshowModal(false), navigation.goBack()}}
        onRight={()=>AndroidOpenSettings.locationSourceSettings()}
        onLeft={() =>{setshowModal(false), navigation.goBack()}}
        rightButton='Mở cài đặt'
        style={{height:AppMetrics.screenHeight/3,backgroundColor:'white'}}
      />
    </View>
  );
}
