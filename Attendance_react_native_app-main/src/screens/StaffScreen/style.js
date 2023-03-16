import { StyleSheet } from "react-native";
import { AppColors, AppMetrics } from "../../theme";

export const styles = StyleSheet.create({
  container: {},
  row:{
    flexDirection:'row',
    marginVertical:10
    // marginHorizontal:AppMetrics.marginLeft,
    // justifyContent:'space-between',
    // backgroundColor:AppColors.white,
    // paddingVertical:scale(10),
    // marginBottom:scale(10),
    // paddingHorizontal:AppMetrics.marginLeft,
    // borderRadius:scale(10)
  },
  button:{
    width:AppMetrics.screenWidth/2-20,
  },
  ava:{
    width:80,height:80,
    borderRadius:60,
    marginHorizontal:20
  },
  view:{
    flexDirection:'row',
    borderBottomWidth:0.25,
    width:'70%',
    justifyContent:'space-between',
  },
  text:{
    alignItems:'center', 
    textAlign: 'center',
    fontSize:15,
    // marginTop:16
  },
  call:{  
    // backgroundColor:'red',
    width:60,
    height:60,
    justifyContent: 'center',
    alignItems:'center'
  },
});
