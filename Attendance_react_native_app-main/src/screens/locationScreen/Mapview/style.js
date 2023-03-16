import { StyleSheet } from 'react-native';
import { AppColors, AppMetrics } from '../../../theme';

export const styles = StyleSheet.create({
    
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 12,
        width: '100%',
    },

    mapcontainer:{
        width:AppMetrics.screenWidth*0.85,
        height:AppMetrics.screenHeight/3,
        alignSelf:'center',
        marginVertical:10
    },

    container:{
        borderColor:AppColors.green,
        borderWidth:1,
        marginHorizontal:AppMetrics.marginLeft,
        borderRadius:10,
        marginVertical:5
    },
  
});