import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList,Image ,ActivityIndicator,Alert} from "react-native";
import FaceSDK, {
  Enum,
  FaceCaptureResponse,
  MatchFacesResponse,
  MatchFacesRequest,
  Image as FaceImage,
} from "@regulaforensics/react-native-face-api";
import Geolocation from "../../controller/geolocationActions";
import { styles } from "./styles";
import { Header, Button, LoadingModal,Modal } from "../../components";
import { AppColors, AppMetrics ,AppImgSrcs} from "../../theme";
import Mapview from "./Mapview/index";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import faceController from "../../controller/faceController";
import ChamCongController from "../../controller/chamCongController";
import moment from "moment";
import shiftsController from "../../controller/shiftsController";
import AndroidOpenSettings from 'react-native-android-open-settings';

var image = new FaceImage();

export default function App({ navigation }) {
  const [location, setlocation] = useState(null);
  const [screenLoading, setscreenLoading] = useState(false);
  const [arr_shifts, setarr_shifts] = useState([]);
  const [selected_shifts, setselected_shifts] = useState(null);

  const face_data = useSelector((state) => state.FaceReducer.facedataa);
  const user = useSelector((state) => state.AuthenReducer.user);
  const [type, settype] = useState(0);
  const [ChamCongListInDay, setChamCongListInDay] = useState([]);
  const [titleButton, settitleButton] = useState("Vào ca");
  const [chamcong_id, setchamcong_id] = useState(Math.random());
  const [loading, setloading] = useState(false)
  const [compayLocation, setcompayLocation] = useState({lat:0,long:0})
  const [showModal, setshowModal] = useState(false)

  let _unsubcribe = null;
  useEffect(() => {
    _unsubcribe =navigation.addListener("focus", () => {
      getLocation();
      getShiftInday();
      getChamcongInDay();
      getCompanyLocation();
    });
  }, []);

  //lấy gps công ty
  const getCompanyLocation = async()=>{
    const response= await Geolocation.getCompanyLocation(user.company_id)
  const {code,data}= response
  if(code ==200 && data.length>0){
    setcompayLocation(data[0].location)
  }
  }
  const getChamcongInDay = async () => {
    let params = {
      user_id: user.user_id,
      day: moment(new Date()).format("DD/MM/YYYY"),
    };
    const response = await ChamCongController.getChamcongInDay(params);
    const { code, data } = response;
    if (code == 200) {
      setChamCongListInDay(data);
    }
  };

  const getShiftInday = async () => {
    let params = {
      company_id: user.company_id,
      department_id: user.department_id,
      day: moment(new Date()).format("dddd"),
    };

    const response = await shiftsController.getShiftsInDay(params);
    const { code, data } = response;
    if (code == 200 && data.length > 0) {
      setarr_shifts(data);
    } else {
      setarr_shifts([]);
    }
  };

  const getLocation = async () => {
    setloading(true)
    const response = await Geolocation.getLocation();
    if(response){
      setlocation(response.params);
    setloading(false)
    }
    
    else{
      setloading(false)
      setshowModal(true)
    }
    
  };


  const setImage = async (base64, type) => {
    if (base64 == null) return;
    image.bitmap = base64;
    image.imageType = type;
    if (image.bitmap) {
      matchFaces();
    }
  };

  const requestserver = async () => {
    let params = {
      user_id: user.user_id,
      time: moment(new Date().getTime()).format("HH:mm"),
      type: type,
      location: location,
      date: moment(new Date()).format("DD/MM/YYYY"),
      status: "",
      shifts: selected_shifts,
      chamcong_id: chamcong_id,
    };
    const response = await faceController.attendance(params);

    if (response.code == 200) {
      Toast.show({
        text1: "Face attendance",
        text2: "Điểm danh thành công",
      });
      getChamcongInDay();
      setselected_shifts(null);
    } else {
      Toast.show({
        type: "error",
        text1: "Face attendance",
        text2: "Diểm danh thất bại",
      });
    }
  };

  const matchFaces = () => {
    setscreenLoading(true);
    const request = new MatchFacesRequest();
    request.images = [face_data.face, image];
    FaceSDK.matchFaces(
      JSON.stringify(request),
      (response) => {
        response = MatchFacesResponse.fromJson(JSON.parse(response));
        const matchedFaces = response.matchedFaces;
        if (matchedFaces.length > 0) {
          setscreenLoading(false);
          if ((matchedFaces[0].similarity * 100).toFixed(2) > 98) {
            requestserver();
          } else {
            Toast.show({
              type: "error",
              text1: "Face attendance",
              text2: "Khuôn mặt không khớp, xin vui lòng thử lại",
            });
          }
        }
      },
      (e) => {}
    );
  };

  const onRecognition = async() => {
    const res = await Geolocation.getDistance(compayLocation,location)
    if(res<10){
      if (!face_data.name) {
        Toast.show({
          type: "error",
          text1: "Face attendance",
          text2: "Bạn cần đăng ký khuôn mặt để sử dụng chức năng này",
        });
      } else {
        if (type == 0 || type == 1) {
          FaceSDK.presentFaceCaptureActivity(
            (result) => {
              setImage(
                FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap,
                Enum.ImageType.IMAGE_TYPE_LIVE
              );
            },
            (e) => {}
          );
        } else {
          Toast.show({
            type: "error",
            text1: "Face attendance",
            text2: "Ca làm đã hoàn thành hoặc không hợp lệ",
          });
        }
      }
    }
    else{
      Toast.show({
        type: "error",
        text1: "Face attendance",
        text2: "Bạn không thể điểm danh khi đứng quá xa công ty",
      });
    }
  
  };

  const onSelecthifts = (item) => {
    setselected_shifts(item);
    for (let i = 0; i < ChamCongListInDay.length; i++) {
      if (item.shifts_code == ChamCongListInDay[i].shifts.shifts_code) {
        if (ChamCongListInDay[i].status[1] == "Chưa ra ca") {
          settype(1);
          settitleButton("Ra ca");
          setchamcong_id(ChamCongListInDay[i].chamcong_id);
        } else {
          settype(2);
          settitleButton("Đã hoàn thành");
        }
        break;
      } else {
        settype(0);
        settitleButton("Vào ca");
        setchamcong_id(Math.random());
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title={"Điểm danh"} goBack={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{"Thông tin vị trí"}</Text>
        <Mapview location={location} compayLocation={compayLocation} />
        <TouchableOpacity onPress={()=>getLocation()} style={{flexDirection:'row',}}>
          <Text style={{color:AppColors.green,marginLeft:AppMetrics.marginRight}}>{'Làm mới'}</Text>
          {loading? <ActivityIndicator/> :
          <Image
            source={AppImgSrcs.ic_refresh}
            style={{width:20,height:20,marginLeft:10}}
          />
          }
        </TouchableOpacity>
        <Text style={styles.title}>{"Ca làm việc"}</Text>
        <FlatList
          data={arr_shifts}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelecthifts(item)}
              style={[
                styles.shifts,
                {
                  backgroundColor:
                    selected_shifts &&
                    selected_shifts.shifts_code == item.shifts_code
                      ? AppColors.green
                      : null,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ marginHorizontal: 10 }}>{item.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ marginHorizontal: 10 }}
                  >{`${item.time_start} - ${item.time_end}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
          marginHorizontal: AppMetrics.marginLeft,
        }}
      >
        {(type == 1 || (type == 0 && selected_shifts !== null)) && (
          <Button
            onPress={() => onRecognition()}
            // onPress={() => requestserver()}
            title={titleButton}
            style={styles.button}
          />
        )}
      </View>
      <Modal
        isVisible={showModal}
        renderBody={() => (<Text style={{fontSize:20,textAlign:'center'}}>{'Bật vị trí trên thiết bị của bạn để sử dụng chức năng này'}</Text>)}
        onClose={() =>{setshowModal(false), navigation.goBack()}}
        onRight={()=>AndroidOpenSettings.locationSourceSettings()}
        onLeft={() =>{setshowModal(false),getLocation()}}
        // onLeft={() =>{setshowModal(false), navigation.goBack()}}
        rightButton='Mở cài đặt'
        leftButton="Thử lại"
        style={{height:AppMetrics.screenHeight/3,backgroundColor:'white'}}
      />

      <LoadingModal isVisible={screenLoading} />
    </View>
  );
}
