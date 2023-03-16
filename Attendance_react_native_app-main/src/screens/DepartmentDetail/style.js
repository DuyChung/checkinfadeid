import { StyleSheet } from "react-native";
import { AppColors, AppMetrics } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    width: AppMetrics.screenWidth / 2 - 20,
  },

  renderbutton: {
    flexDirection: "row",
    marginBottom: AppMetrics.marginLeft,
    justifyContent: "space-between",
    marginHorizontal: AppMetrics.marginLeft,
  },
  rowItem: {
    flexDirection: "row",
    marginHorizontal: AppMetrics.marginLeft * 2,
    marginTop: 10,
    alignItems:'center'
  },
  title: {
     marginHorizontal: AppMetrics.marginLeft,
     fontSize:17,
     fontWeight:'bold',
     marginTop:15
    },
    avatar:{
      width:40,
      height:40,
      borderRadius:20,
      marginRight:5
    },
    shiftsitem:{
      marginHorizontal:AppMetrics.marginLeft*2,
      backgroundColor:AppColors.green,
      borderRadius:10,
      flexDirection:'row',
      alignItems:'center',
      padding:10,
      marginBottom:10
    },
    add:{
      backgroundColor:AppColors.green,
      paddingHorizontal:10,
      paddingVertical:3,
      borderRadius:10,
      color:AppColors.white,
      fontWeight:'bold'
    }
 
});
