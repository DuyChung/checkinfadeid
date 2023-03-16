import React from 'react';
import { View, LogBox, StatusBar } from 'react-native';
import RootNavigator from './src/navigators';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs(true);
StatusBar.setBarStyle('dark-content');
const MyBase = () => {
  return (
    <View style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
        <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};
export default MyBase;

