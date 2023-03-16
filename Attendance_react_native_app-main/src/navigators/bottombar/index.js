import React from 'react';
import {
  Alert,
  Animated,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../../screens/home';
import SettingScreen from '../../screens/setting';
import { AppImgSrcs,AppColors } from '../../theme';
import { styles } from './styles';

function MainTab ({navigation}){
  const _renderIcon = (routeName, selectTab) => {
    let icon = '';
    switch (routeName) {
      case 'home':
        icon = 'ios-home-outline';
        break;
      case 'profie':
        icon = 'settings-outline';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={(25)}
        color={routeName === selectTab ? AppColors.green : 'gray'}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CurvedBottomBar.Navigator
        style={{ backgroundColor: '#F5F5F5' }}
        strokeWidth={1}
        circleWidth={(50)}
        bgColor="white"
        height={(50)}
        renderCircle={() => (
          <Animated.View style={styles.btnCircle}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FaceRecognition')}>
              <Image
                source={AppImgSrcs.ic_bottomtab}
                style={{width:30,height:30}}
              />
            </TouchableOpacity>
          </Animated.View>
        )}

        tabBar={({routeName,selectTab,navigate})=>(
          <TouchableOpacity
          onPress={() =>navigate(routeName)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
          {_renderIcon(routeName, selectTab)}
        </TouchableOpacity>
        )}
      
        >

        <CurvedBottomBar.Screen
          name="home"
          position="left"
          component={() => <HomeScreen/>}
        />
        <CurvedBottomBar.Screen
          name="profie"
          component={() => <SettingScreen/>}
          position="right"
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
};

export default MainTab;
