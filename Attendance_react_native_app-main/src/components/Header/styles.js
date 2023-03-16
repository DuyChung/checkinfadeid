import { StyleSheet } from 'react-native';
import { AppColors, AppMetrics } from '../../theme';

export const styles = StyleSheet.create({
  container: {
   flexDirection:'row',
   paddingVertical:(15),
   backgroundColor:AppColors.whiteBackground,
   elevation:5,
   borderBottomColor:AppColors.grayAlto
  },
  backIcon:{
    width:(25),
    height:(25),
    marginHorizontal:AppMetrics.marginLeft
  }
});
