'use strict';

import React from 'react';
import { style } from './app/style';
import { Icon } from 'react-native-elements';
import { name, displayName } from './app.json';
import HomeActivity from './app/activities/home-activity';
import SplashActivity from './app/activities/splash-activity';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry, StatusBar, Text, View } from 'react-native';

const Stack = createStackNavigator();

AppRegistry.registerComponent(name, () => () => (
  <NavigationContainer>
    <StatusBar backgroundColor={style.StatusBar.backgroundColor} barStyle="dark-content" />
    <Stack.Navigator>
      <Stack.Screen name="splash" component={SplashActivity} options=
        {
          {
            headerShown: false
          }
        } />
      <Stack.Screen name="home" component={HomeActivity} options=
        {
          ({ navigation }) => ({
            headerStyle: {
              backgroundColor: style.Header.backgroundColor
            },
            headerTitle: <Text style={style.HomeHeaderTitle}>{displayName}</Text>,
            headerLeft: () => (
              <View style={{ width: 60 }}>
                <Icon type="feather" name="search" onPress={() => navigation.navigate("home", { searchModal: true, searchMode: "none" })} />
              </View>
            ),
            headerRight: () => (
              <View style={{ width: 60 }}>
                <Icon type="feather" name="edit-3" onPress={() => alert("WRITE")} />
              </View>
            )
          })
        } />
    </Stack.Navigator>
  </NavigationContainer>
));