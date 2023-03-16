import React from 'react'
import { Text, View,Image ,StyleSheet} from 'react-native'
import {AppImgSrcs,AppMetrics} from '../../theme'

export default function index({isChecked,onCheck}) {
  return (
    <View
      onTouchEnd={onCheck}
    >
        <Image
        resizeMode="contain"
        style={styles.icon}
          source={isChecked?AppImgSrcs.ic_radioTrue:AppImgSrcs.ic_radioFalse}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  icon:{
    width:(18),
    height:(18)
  }
})
