import { StyleSheet } from 'react-native';
import { AppColors, AppMetrics } from '../../theme';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:AppColors.white
    },
   
    content:{
        marginHorizontal:AppMetrics.marginLeft,
        color:'black',
        fontSize:20,
        fontWeight:'bold',
        marginBottom:15
    },
    
    renderButton:{
        flexDirection:'row',
        marginHorizontal:AppMetrics.marginLeft,
        marginVertical:20,
    },
    button:{
        flex:1
    }

});
