'use strict';

import React from 'react';
import { style } from './app/style';
import { name, displayName } from './app.json';
import { AppRegistry, StatusBar } from 'react-native';
import HomeActivity from './app/activities/home-activity';
import SplashActivity from './app/activities/splash-activity';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

AppRegistry.registerComponent(name, () => () => (
  <NavigationContainer>
    <StatusBar hidden={false} backgroundColor={style.StatusBar.backgroundColor} barStyle="dark-content" />
    <Stack.Navigator>
      <Stack.Screen name="splash" component={SplashActivity} options={{ headerShown: false }} />
      <Stack.Screen name="home" component={HomeActivity} options={{ headerLeft: null, headerStyle: { backgroundColor: style.Header.backgroundColor }, headerTitleStyle: { alignSelf: 'center' }, title: displayName }} />
    </Stack.Navigator>
  </NavigationContainer>
));