import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppColors, AppMetrics } from '../../../theme'
import {Button} from '../../../components'

export default function EmptyData({onPress}) {
    return (
        <>
        <View style={styles.container}>
            <Text style={styles.content}>{'Bạn chưa đăng kí khuôn mặt'}</Text>
        </View>
        <Button
            onPress={onPress}
            title={'THÊM KHUÔN MẶT'}
            style={styles.button}
        />
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    content:{
        fontSize:20,
        marginHorizontal:AppMetrics.marginLeft,
    },
    button:{
        backgroundColor:AppColors.green,
        marginHorizontal:AppMetrics.marginLeft
    }
})
