import {
  NavigationContainer,
} from '@react-navigation/native';
import React,{useEffect,useState} from 'react';
import {AuthNavigator} from './AuthNavigator'
import {AppNavigator} from './AppNaigator'
import {useSelector} from 'react-redux'
import {NoInternet} from '../screens/NoInternet'
import NetInfo from "@react-native-community/netinfo";
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splashScrees'

const Stack = createStackNavigator();

function RootNavigator() {

  const [ConnectStatus, setConnectStatus] = useState(true);

  const user = useSelector(state => state.AuthenReducer.user)
  useEffect(() => {
    // Khi component khởi tạo
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("connection Type:", state.type)
      console.log("Is Connected?", state.isConnected)
      setConnectStatus(state.isConnected)
    })

    // Khi component huỷ
    return () => {
      unsubscribe();
    };
  }, []);
  const checkStatus = () => {
    NetInfo.fetch().then((state) => {
      setConnectStatus(state.isConnected);
    });
  }
  if(ConnectStatus){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SwitchNavigator" component={SwitchNavigator} options={{ headerShown: false }}/>
        </Stack.Navigator>
         {/**/}
      </NavigationContainer>
    );
  }
  else{
    return (
      <NoInternet onPress={checkStatus} />
    )
  }

}
export default RootNavigator;

function SwitchNavigator (){
  const user = useSelector(state => state.AuthenReducer.user)
  if(user){
    return <AppNavigator user={user}/>
  }
  else return <AuthNavigator/>
}