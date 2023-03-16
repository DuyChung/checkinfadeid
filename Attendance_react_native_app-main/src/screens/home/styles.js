import { StyleSheet } from 'react-native';
import {AppMetrics,AppColors, AppImgSrcs} from '../../theme'
export const styles = StyleSheet.create({
  container: { flex: 1 },
  header:{
    backgroundColor:AppColors.green,
    width:AppMetrics.screenWidth*1.2,
    height:AppMetrics.screenHeight/3,
    borderBottomRightRadius:AppMetrics.screenWidth/1.5,
    borderBottomLeftRadius:AppMetrics.screenWidth/1.5,
    alignSelf:'center',
    justifyContent:'flex-end',
    alignItems:'center',
    
  },
  avatarWrap:{
   width:AppMetrics.screenWidth/3,
   height:AppMetrics.screenWidth/3,
   borderRadius:AppMetrics.screenWidth/6,
   backgroundColor:AppColors.grayIron
  },
  wrapperAvatar:{
    width:AppMetrics.screenWidth/2.8,
   height:AppMetrics.screenWidth/2.8,
   borderRadius:AppMetrics.screenWidth/6+5,
   top:AppMetrics.screenWidth/7,
   alignItems:'center',
   justifyContent:'center',
  },
  manager:{
    alignItems:'center'
  },
  itemwrap:{
    width:AppMetrics.screenWidth/2-20,
    backgroundColor:AppColors.whiteBackground,
    alignItems:'center',
    paddingVertical:20,
    marginHorizontal:5,
    marginBottom:10,
    borderRadius:7,
    elevation:5,
  },
  title:{color:AppColors.white,fontWeight:'bold',fontSize:18}
});
