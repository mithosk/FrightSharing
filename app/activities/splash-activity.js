'use strict';

import { style } from '../style';
import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

export default class SplashActivity extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <View style={style.SplashBody}>
        <StatusBar barStyle="dark-content" hidden={true} style={style.SplashStatusBar} />
        <Text>CIAO</Text>
      </View>
    );
  }

}