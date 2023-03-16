import { StyleSheet } from "react-native";
import { AppColors, AppMetrics } from "../../theme";

export const styles = StyleSheet.create({
  container: {},
  row:{
    flexDirection:'row',
    marginHorizontal:AppMetrics.marginLeft,
    justifyContent:'space-between',
    backgroundColor:AppColors.white,
    paddingVertical:(10),
    marginBottom:(10),
    paddingHorizontal:AppMetrics.marginLeft,
    borderRadius:(10)
  },
  button:{
    marginHorizontal:AppMetrics.marginLeft,
    marginBottom:20
  },
  timepicker:{
    flexDirection:'row',
    borderWidth:1
  }
});
