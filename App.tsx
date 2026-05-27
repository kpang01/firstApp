// App.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';

import HomeScreen from './src/screens/HomeScreen';

const Tab = createBottomTabNavigator();

const CameraScreen = () => null;
const HistoryScreen = () => null;
const SettingsScreen = () => null;

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <BlurView intensity={80} style={styles.blurTab}>
        {state.routes.map((route, index) => {
          if (route.name === 'Camera') {
            return <View key={index} style={{ flex: 1 }} />;
          }

          const isFocused = state.index === index;

          let iconName = '';
          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'History') iconName = 'history';
          if (route.name === 'Settings') iconName = 'cog';

          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tabItem}
            >
              <Icon
                name={iconName}
                size={24}
                color={isFocused ? '#4A90E2' : '#999'}
              />
            </TouchableOpacity>
          );
        })}
      </BlurView>

      {/* Floating Camera Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Camera')}
      >
        <Icon name="camera" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  blurTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 30,
    padding: 15,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: -25,
    backgroundColor: '#4A90E2',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});