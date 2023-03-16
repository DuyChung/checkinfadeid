import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScrenn from '../screens/login'
import RegisterScrenn from '../screens/register'
const Stack = createStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={LoginScrenn} name={'LoginScrenn'} options={{ headerShown: false }} />
      <Stack.Screen component={RegisterScrenn} name={'RegisterScrenn'} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
