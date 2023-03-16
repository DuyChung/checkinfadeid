import { StyleSheet } from 'react-native';
import { AppColors, AppMetrics } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:AppColors.white
  },
  locationwrapper:{
    borderWidth:1,
    marginHorizontal:AppMetrics.marginLeft,
    borderRadius:10,
    padding:10,
    marginVertical:AppMetrics.marginLeft
  },
  shifts:{
    borderWidth:1,
    marginHorizontal:AppMetrics.marginLeft,
    borderRadius:10,
    padding:10,
    marginVertical:AppMetrics.marginLeft
  },
  title:{
    fontWeight:'bold',
    marginHorizontal:AppMetrics.marginLeft,
    marginVertical:10
},
button:{
  flex:1
}
});
