import { StyleSheet } from 'react-native';
import { AppColors, AppMetrics } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  Login:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginVertical:15,
    color:AppColors.green
  },
  renderInput:{
    flex:1,
    justifyContent:'center'
  },
  renderCheckBox:{
    flexDirection:'row',
    marginHorizontal:AppMetrics.marginLeft*2,
    justifyContent:'space-between',
    marginVertical:20
  },
  button:{
    marginHorizontal:AppMetrics.marginLeft,
    marginBottom:20,
    backgroundColor:AppColors.green
  }
});
