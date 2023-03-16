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
  text1:{
    fontSize:20,borderBottomWidth:1,fontWeight:'bold',
    paddingBottom:10
  },
  text2:{
    fontSize:16,
    marginVertical:10
  },
  textinput:{  
    backgroundColor:'white',
    borderRadius:10,
    paddingLeft:20,
    marginBottom:20,
    
  },
  dropdown:{
    backgroundColor:'white', width:'100%',height:45,
    borderRadius:10,
    marginBottom:10
  },
  touch:{
    backgroundColor:"white", 
    height:45,
    borderRadius:10
  }
});
