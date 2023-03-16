import { StyleSheet } from "react-native";
import { AppColors, AppMetrics } from "../../theme";

export const styles = StyleSheet.create({
 
  button: {
    width: AppMetrics.screenWidth / 2 - 20,
  },
  title:{
    fontWeight:'bold',
    fontSize:20,
    marginHorizontal:AppMetrics.marginLeft,
    borderBottomWidth:1,
    marginBottom:20
  },
  picker:{
    borderWidth:1,
    marginHorizontal:AppMetrics.marginLeft,
    borderRadius:5,
    paddingVertical:15,
    marginTop:10,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:AppMetrics.marginLeft
  },
  renderDepartmant:{
    flexDirection:'row',
    marginHorizontal:AppMetrics.marginLeft,
    marginTop:10
  }
});
