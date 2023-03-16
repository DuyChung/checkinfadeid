import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
} from "react-native";
import FaceSDK, {
  Enum,
  LivenessResponse,
  Image as FaceImage,
} from "@regulaforensics/react-native-face-api";
import { Header, Button,LoadingModal } from "../../components";
import {useSelector,useDispatch} from 'react-redux'
import faceController from '../../controller/faceController'
import {styles} from './styles'
import EmptyData from './emptyData'
import moment from 'moment'
import { AppImgSrcs } from "../../theme";
import Toast from 'react-native-toast-message'
import {addFace,deleteFace} from '../../redux/actions/FaceActions'

var image = new FaceImage();

export default function FaceScreen({navigation}) {

  const user = useSelector(state => state.AuthenReducer.user)
  
  const face_data = useSelector(state => state.FaceReducer.facedataa)

  const [buttonLoading, setbuttonLoading] = useState(false)

  const [screenLoading, setscreenLoading] = useState(false)

  const dispatch = useDispatch()

const onFaceRegister = () =>{
  liveness();
}

const onDeleteFace = async()=>{
  setbuttonLoading(true)
  const respone = await faceController.deleteFace(user.user_id)
  const {code}= respone
  if(code==200){
    
    dispatch(deleteFace())
    Toast.show({
      type:'success',
      text1:'Face attendance',
      text2:'Đã xoá khuôn mặt'
    })
    setbuttonLoading(false)
  }
}

  const setImage = async(base64, type) => {
    if (base64 == null) return;
    image.bitmap = base64;
    image.imageType = type;
    if(image.bitmap){
    const params = {
      name:user.name,
      face_data: image,
      user_id:user.user_id
    }
    setscreenLoading(true)
     const respone = await faceController.addFace(params)
     const {code,data}= respone
     if(code == 200){
       dispatch(addFace(image,user.name,user.user_id))
      Toast.show({
        type:'success',
        text1:'Face attendance',
        text2:'Đã thêm khuôn mặt'
      })
      setscreenLoading(false)
     }
     else{
      Toast.show({
        type:'error',
        text1:'Face attendance',
        text2:'Lỗi'
      })
      setscreenLoading(false)
     }
    }
  };

  const liveness = () => {
    FaceSDK.startLiveness(
      (result) => {
        result = LivenessResponse.fromJson(JSON.parse(result));
        setImage(result.bitmap, Enum.ImageType.IMAGE_TYPE_LIVE);
      },
      (e) => {
        console.log("error", e);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Header title={"Khuôn mặt"} goBack={() => navigation.goBack()} />
      {
        face_data.name?
          <>
          <View style={{flexDirection:'row',marginTop:20,flex:1}}>
            <Image
              source={AppImgSrcs.ic_faceRecognition}
              style={styles.icon}
            />
            <View>
              <Text>{face_data.name}</Text>
              <Text>{face_data.user_id}</Text>
            </View>
          </View>

          <Button
            title={'Xoá khuôn mặt'}
            style={styles.button}
            onPress={()=>onDeleteFace()}
            loading={buttonLoading}
          />
          </>
        :<EmptyData
          onPress={()=>onFaceRegister()}
        />
      }
        <LoadingModal
        isVisible={screenLoading}
    />
    </View>
  
  );
}
