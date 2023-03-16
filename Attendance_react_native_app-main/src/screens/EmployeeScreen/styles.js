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
  },
  listuserSearch:{
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:AppMetrics.marginLeft
  },
  avatar:{width:40,height:40,marginLeft:AppMetrics.marginLeft,marginRight:3,borderRadius:20}
});
