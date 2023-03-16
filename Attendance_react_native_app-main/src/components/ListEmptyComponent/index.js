import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppColors, AppMetrics } from '../../theme'

export default function ListEmptyComponent({title}) {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>
         {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  title:{
    fontSize:20,
    textAlign:'center',
    color:AppColors.grayDove,
    marginHorizontal:AppMetrics.marginLeft
  }
})
