import { StyleSheet } from 'react-native';
import { AppColors, AppMetrics } from '../../../theme';

export const styles = StyleSheet.create({
   
    header:{
        marginHorizontal:AppMetrics.marginLeft,
        color:'black',
        fontSize:20,
        fontWeight:'bold',
        marginBottom:15
    },
    avatar:{
        width:AppMetrics.screenWidth/3,
        height:AppMetrics.screenWidth/3,
        alignSelf:'center',
        marginVertical:30,
        borderRadius:AppMetrics.screenWidth/6
    },

});
