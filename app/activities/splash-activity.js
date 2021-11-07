'use strict';

import { style } from '../style';
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import createGuid from 'react-native-create-guid';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SplashActivity extends Component {

  constructor(props) {
    super(props);

    this.setUserId().then(() => {
      this.startup();
    });
  }

  render() {
    return (
      <View style={style.SplashBody}>
        <Image source={require("../images/logo.png")} style={{ width: 200, height: 200 }} />
      </View>
    );
  }

  setUserId = async () => {
    var userId = await AsyncStorage.getItem("userId");

    if (userId == null)
      await AsyncStorage.setItem("userId", await createGuid());
  }

  startup = () => {
    setTimeout(() => {
      this.props.navigation.navigate("home", { searchModal: false, searchMode: "new" });

      this.props.navigation.dispatch(state => {
        var routes = state.routes.filter(route => route.name != "splash");

        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    },
      4000
    );
  }

}