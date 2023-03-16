import React from 'react'
import { StyleSheet, Text, View,TextInput, Alert } from 'react-native'
import {AppColors,AppMetrics} from '../../theme'

export default function Texfield({title,style,onChangeText,value,secureTextEntry,onTouchStart,keyboardType,editable,onEndEditing}) {
    return (
        <View style={[styles.container,style]}>
            <Text>{title}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                style={styles.input}
                onChangeText={(text)=>onChangeText(text)}
                value={value}
                onTouchStart={onTouchStart}
                keyboardType={keyboardType}
                editable={editable}
                onEndEditing={onEndEditing}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderRadius:5,
        marginVertical:10
    },
    container:{
        marginHorizontal:AppMetrics.marginLeft
    }
})
