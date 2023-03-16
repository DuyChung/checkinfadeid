import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppColors, AppImgSrcs, AppMetrics } from "../../theme";
import {
  Header,
  ListEmptyComponent,
  Button,
  Modal,
  TextField,
  TimePicker,
  Checkbox,
  SearchBar,
} from "../../components";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import employeeController from "../../controller/employeeController";
import CompayInfo from './CompanyInfo'
import Geolocation from '../../controller/geolocationActions'

export default function UserCompany({ navigation }) {

  const [showModal, setshowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [employee, setemployee] = useState([]);
  const [valueSearch, setvalueSearch] = useState("");
  const [searching, setsearching] = useState(false)

  const [companyLocation, setcompanyLocation] = useState({lat:0,long:0})
  const [companyAddress, setcompanyAddress] = useState(null)

  const user = useSelector((state) => state.AuthenReducer.user);

  let _unsubcribe = null;
  useEffect(() => {
    _unsubcribe = navigation.addListener("focus", () => {
      getCompanyLocation();
    });
  }, []);

//lấy vị trí công ty
const getCompanyLocation = async()=>{
  if(user && user.company_id !==null){
    const response = await Geolocation.getCompanyLocation(user.company_id)
    const {code,data}= response
    if(code == 200 && data.length>0){
      setcompanyAddress(data[0].name)
      setcompanyLocation(data[0].location)
    }
  }
}
  //nội dung modal
  const renderBody = () => {
    return (
      <>
        <SearchBar
          placeholder={"Nhập tên công ty"}
          value={valueSearch}
          onChangeText={null}
          onPressSearch={() => null()}
        />
        {
          searching? <ActivityIndicator size='large'/>
          : <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={employee}
          renderItem={({ item }) =>(
            <View style={styles.listuserSearch}>
              <Checkbox
                check={false}
                onPress={()=>null}
              />
              <Image
                source={item.avatar||AppImgSrcs.ic_user}
                style={styles.avatar}
              />
              <Text>{item.name}</Text>
            </View>
          )}
        />
        }
      </>
    );
  };

  const onRefresh = () => {
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Công ty"} goBack={() => navigation.goBack()} />
      {user.company_id ? (
       <CompayInfo
        companyAddress={companyAddress}
        companyLocation={companyLocation}
    />
      ) : (
       <View style={{flex:1}}>
          <ListEmptyComponent
            title={'Bạn chưa có công ty. Hãy liên hệ với chủ doanh nghiệp để được thêm vào công ty'}
          />
            {/* <Button
        style={styles.button}
        title={"Thêm"}
        onPress={() => setshowModal(true)}
      /> */}
       </View>
      )}

      {/* <Modal
        title="Tìm công ty"
        isVisible={showModal}
        renderBody={() => renderBody()}
        onClose={() => setshowModal(false)}
        onRight={() => submit()}
        onLeft={() => setshowModal(false)}
        loading={loading}
      />
     */}
    </View>
  );
}
