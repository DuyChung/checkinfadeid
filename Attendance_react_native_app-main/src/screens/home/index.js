import { FlatList } from "../../components";
import React,{useEffect} from "react";
import {
  Alert,
  SafeAreaView,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { styles } from "./styles";
import { AppMetrics, AppColors, AppImgSrcs } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import authController from '../../controller/authController'
import {log_in} from '../../redux/actions/AuthenAction'

const listdata = [
  {
    id: 1,
    title: "Lịch sử",
    icon: AppImgSrcs.ic_history,
    navigate: "HistoryScreen",
  },
  {
    id: 2,
    title: "Lịch biểu",
    icon: AppImgSrcs.ic_time_table,
    navigate: "TimeTable",
  },
  {
    id: 3,
    title: "Bảng chấm công",
    icon: AppImgSrcs.ic_chamcong,
    navigate: "ChamCong",
  },
  {
    id: 4,
    title: "Thông báo",
    icon: AppImgSrcs.ic_bell,
    navigate: "HistoryScreen",
  },
  {
    id: 5,
    title: "Công ty",
    icon: AppImgSrcs.ic_conpany,
    navigate: "CompanyScreen",
  },
];
const listdatauser = [
  {
    id: 1,
    title: "Lịch sử",
    icon: AppImgSrcs.ic_history,
    navigate: "HistoryScreen",
  },
  {
    id: 2,
    title: "Lịch biểu",
    icon: AppImgSrcs.ic_time_table,
    navigate: "TimeTable",
  },
  {
    id: 3,
    title: "Bảng chấm công",
    icon: AppImgSrcs.ic_chamcong,
    navigate: "ChamCong",
  },
  {
    id: 4,
    title: "Thông báo",
    icon: AppImgSrcs.ic_bell,
    navigate: "Notifycation",
  },
];
export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.AuthenReducer.user);

  const dispatch = useDispatch()

  let _unsubcribe = null;
  const {addListener} = useNavigation()
  useEffect(() => {
    _unsubcribe = addListener("focus", () => {
      getUserInfo();
    });
  }, [])

  const getUserInfo= async()=>{
    const params ={
      phone:user.phone,
      password:user.password
    }
    const respone = await authController.login(params);
    const { code, data } = respone;
    if (code == 200 && data) {
      dispatch(log_in(data));
    } 
  }

  const { navigate } = useNavigation();
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[styles.itemwrap, {}]}
        onPress={() => navigate(item.navigate)}
      >
        <Image
          style={{ width: 35, height: 35 }}
          source={item.icon}
          resizeMode="center"
        />
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{}}>
      <View style={{ flex: 1, marginBottom: AppMetrics.screenWidth / 6 }}>
        <View style={styles.header}>
          <View
            style={{
              alignItems: "center",
              maxWidth: AppMetrics.screenWidth - 30,
            }}
          >
            {/* <Text style={styles.title}>{"Xin chào " + user.name}</Text> */}
            <Text style={styles.title}>{"id: " + user.user_id}</Text>
          </View>
          <View style={styles.wrapperAvatar}>
            <Image
              source={user.avatar || AppImgSrcs.ic_user}
              style={styles.avatarWrap}
            />
          </View>
        </View>
      </View>

      <View style={[{ flex: 1 }, styles.manager]}>
        <Text
          style={{
            color: AppColors.green,
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          {"DANH MỤC QUẢN LÝ"}
        </Text>
        <FlatList
          style={{ flex: 1 }}
          data={user.root == true? listdata : listdatauser}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderItem(item)}
        />
        <View style={{ height: (50) }} />
      </View>
    </ScrollView>
  );
}
