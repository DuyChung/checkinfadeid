import { StyleSheet } from "react-native";
import { AppColors, AppMetrics } from "../../theme";

export const styles = StyleSheet.create({
  container: {},
  row:{
    flexDirection:'row',
    marginHorizontal:AppMetrics.marginLeft,
    justifyContent:'space-between',
    backgroundColor:AppColors.white,
    paddingVertical:(15),
    marginBottom:(10),
    paddingHorizontal:AppMetrics.marginLeft,
    borderRadius:(10)
  },
  button:{
    marginHorizontal:AppMetrics.marginLeft,
    marginBottom:20
  },
  dropdow:{
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:AppMetrics.marginLeft,
    marginBottom:20
  },
  content:{
    fontSize:17
  }
});
