import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native';
import {AppMetrics} from '../../theme'

export default function SplashScreen({navigation}) {
    setTimeout(() => {
        navigation.navigate('SwitchNavigator')
    }, 6000);
    return (
        <View style={{flex:1,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
          <LottieView style={{width:AppMetrics.screenWidth-30,height:AppMetrics.screenHeight-30}} source={require('../../assets/images/lotteFlie/Splash.json')} autoPlay loop />
        </View>
    )
}

const styles = StyleSheet.create({})
