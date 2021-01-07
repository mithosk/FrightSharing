'use strict';

import { style } from '../style';
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';

export default class SplashActivity extends Component {

  constructor() {
    super();

    this.Startup();
  }

  render() {
    return (
      <View style={style.SplashBody}>
        <Image source={require('../images/logo.png')} style={{ width: 200, height: 200 }} />
      </View>
    );
  }

  Startup = () => {
    setTimeout(() => {
      this.props.navigation.navigate('home');

      this.props.navigation.dispatch(s => {
        var routes = s.routes.filter(r => r.name !== 'splash');

        return CommonActions.reset({
          ...s,
          routes,
          index: routes.length - 1,
        });
      });
    },
      4000);
  }

}