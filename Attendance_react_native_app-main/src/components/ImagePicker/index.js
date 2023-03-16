import React,{useState} from "react";
import { Image } from "react-native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Modal } from "../../components";
import { AppMetrics, AppImgSrcs, AppColors } from "../../theme";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Permissions, { check, openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions";

export default function ImagePicker({ showModal, setImage, onClose }) {


  const [showPopup, setshowPopup] = useState(false)

  const lauchcCam = async() => {
    const options = {
      title: "Take A Photo",
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
      allowsEditing: true,
      includeBase64: false,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
     //check quyền
     const status = await check(PERMISSIONS.ANDROID.CAMERA)
     if(status == 'denied'){
       setshowPopup(true)
     }
     else{
      launchCamera(options, async (response) => {
        onClose();
        if (!response) return;
        if (response.error) {
          return Alert.alert("", response.error);
        }
        if (response.didCancel) return;
        if (response.assets.length > 0) {
          setImage(response.assets[0].uri);
        } else {
          Alert.alert("", "chọn 1 ảnh");
        }
      });
     }
  };

  const chooseFromGallery = async () => {
    const options = {
      title: "Take A Photo",
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: false,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (response) => {
      onClose();
      if (!response) return;
      if (response.didCancel) return;
      if (response.error) {
        return Alert.alert("", "Không tìm thấy hình!");
      }
      if (response.assets.length > 0) {
        setImage(response.assets[0].uri);
      } else {
        Alert.alert("", "Chọn 1 ảnh");
      }
    });
  };
  
  const renderBody = () => {
    return (
      <View style={styles.bodyContainer}>
        <TouchableOpacity
          onPress={() => lauchcCam()}
          style={{ alignItems: "center" }}
        >
          <Image
            source={AppImgSrcs.ic_camera}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text>{"Máy ảnh"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => chooseFromGallery()}
          style={{ alignItems: "center" }}
        >
          <Image
            source={AppImgSrcs.ic_library}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text>{"Thư viện"}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
    <Modal
      isVisible={showModal}
      renderBody={() => renderBody()}
      onClose={() => onClose()}
      showButton={false}
      style={styles.container}
    />

    <Modal
        isVisible={showPopup}
        renderBody={() => (<Text style={{fontSize:20,textAlign:'center'}}>{'Bạn chưa cấp quền sử dụng Camera cho Face attendance'}</Text>)}
        onClose={() =>{onClose(),setshowPopup(false)}}
        onRight={()=>openSettings()}
        onLeft={() =>{setshowPopup(false),onClose()}}
        rightButton='Mở cài đặt'
        leftButton="Từ chối"
        style={{height:AppMetrics.screenHeight/3,backgroundColor:'white'}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: AppMetrics.screenHeight / 4,
    backgroundColor: AppColors.white,
  },
  bodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: AppMetrics.marginLeft * 2,
  },
  icon: {
    width: AppMetrics.screenHeight / 7,
    height: AppMetrics.screenHeight / 8,
  },
});
