'use strict';

import React from 'react';
import { style } from './app/style';
import { translate } from './app/vocabulary';
import { Icon } from 'react-native-elements';
import { name, displayName } from './app.json';
import HomeActivity from './app/activities/home-activity';
import { AppRegistry, StatusBar, View } from 'react-native';
import SplashActivity from './app/activities/splash-activity';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddStoryActivity from './app/activities/add-story-activity';

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
            headerStyle: style.Header,
            headerTitle: displayName,
            headerTitleStyle: style.HomeHeaderTitle,
            headerLeft: () => (
              <View style={{ width: 60 }}>
                <Icon type="feather" name="search" onPress={() => navigation.navigate("home", { searchModal: true, searchMode: "none" })} />
              </View>
            ),
            headerRight: () => (
              <View style={{ width: 60 }}>
                <Icon type="feather" name="edit-3" onPress={() => navigation.navigate("addstory")} />
              </View>
            )
          })
        } />
      <Stack.Screen name="addstory" component={AddStoryActivity} options=
        {
          {
            headerStyle: style.Header,
            headerTitle: translate("addstory_header_title")
          }
        } />
    </Stack.Navigator>
  </NavigationContainer>
));