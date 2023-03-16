import { StyleSheet } from "react-native";
import { AppColors } from "../../theme";

export const styles = StyleSheet.create({
  container: {},
  item: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
    marginTop: 10,
  },
  date:{
    backgroundColor:AppColors.green,
    borderRadius:25,
    width:(50),
    height:(50),
    alignItems:'center',
    justifyContent:'center'
  },
  icon:{
    width:(20),
    height:(20),
  }
});
