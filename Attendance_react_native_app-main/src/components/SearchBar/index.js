import React from 'react'
import { StyleSheet, Text, View,TextInput,Image,TouchableOpacity} from 'react-native'
import { AppColors, AppImgSrcs, AppMetrics } from '../../theme'

export default function SearchBar({placeholder,style,value,onChangeText,onPressSearch}) {
    return (
        <View style={[styles.container,style]}>
            <TextInput
                style={{flex:1}}
                placeholder={placeholder}
                value={value}
                onChangeText={(text)=>onChangeText(text)}
            />
            <TouchableOpacity
                onPress={onPressSearch}
            >
                <Image
                    source={AppImgSrcs.ic_search}
                    style={styles.icon}
                />
            </TouchableOpacity>
          
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:AppColors.grayAlto,
        marginHorizontal:AppMetrics.marginLeft,
        borderRadius:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:AppMetrics.marginLeft,
        marginVertical:AppMetrics.marginLeft,
    },
    icon:{
        width:25,
        height:25
    }
})
