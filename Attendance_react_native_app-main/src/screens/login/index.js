import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextField, Button, Checkbox } from "../../components";
import { AppColors, AppMetrics } from "../../theme";
import { styles } from "./styles";
import Util from "../../constants/Util";
import authController from "../../controller/authController";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { log_in } from "../../redux/actions/AuthenAction";
import { Alert } from "react-native";

export default function Login({ navigation }) {
  const [check, setcheck] = useState(false);
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const onChangeText = (type, text) => {
    switch (type) {
      case "phone":
        setphone(text);
        break;
      case "password":
        setpassword(text);
        break;
      default:
        break;
    }
  };

  const onLogin = async () => {
    setloading(true);
    const params = { phone, password };
    let message;
    let isNoEmpty = true;
    let type = "success";
    for (const key in params) {
      if (Util._isStringEmpty(params[key]) === true) {
        isNoEmpty = false;
      } else isNoEmpty = true;
    }
    if (isNoEmpty == false) {
      message = "Vui lòng điền đầy đủ thông tin!";
      setloading(false);
      type = "error";
    } else if (Util._validatePhone(phone) == false) {
      message = "Vui lòng nhập số điện thoại hợp lệ!";
      type = "error";
      setloading(false);
    }
    if (isNoEmpty == true && Util._validatePhone(phone) == true) {
      console.log('=====params====',params)
      try {
        const respone = await authController.login(params);
        console.log('========respons=======', respone)
        setloading(false);
        message = respone.message;
        const { code, data } = respone;
        if (code == 200 && data) {
          dispatch(log_in(data));
        } else {
          type = "error";
        }
      } catch (error) {
        console.log('========err=======', error)
      }

    }
    if (message) {
      Toast.show({
        type: type,
        text1: "Face attendance",
        text2: message,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.Login}>{"ĐĂNG NHẬP"}</Text>

      <View style={styles.renderInput}>
        <TextField
          title={"Số Điện Thoại"}
          onChangeText={onChangeText.bind(this, "phone")}
          value={phone}
        />

        <TextField
          title={"Mật khẩu"}
          secureTextEntry={!check}
          onChangeText={onChangeText.bind(this, "password")}
          value={password}
        />

        <Checkbox
          style={{ marginHorizontal: AppMetrics.marginLeft }}
          check={check}
          label={"Hiện mật khẩu"}
          onPress={() => setcheck(!check)}
        />
      </View>

      <Button
        style={styles.button}
        title={"Đăng nhập"}
        loading={loading}
        onPress={() => onLogin()}
      />

      <Text style={{ marginVertical: 15, textAlign: "center" }}>
        {"Chưa có tài khoản?"}
        <Text
          onPress={() => navigation.navigate("RegisterScrenn")}
          style={{ color: AppColors.green }}
        >
          {"Đăng ký"}
        </Text>
      </Text>
    </View>
  );
}
