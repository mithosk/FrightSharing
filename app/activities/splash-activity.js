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
      <View style={style.Splash}>
        <StatusBar barStyle="dark-content" hidden={true} backgroundColor="#04B486" />
        <Text>CIAO</Text>
      </View>
    );
  }

}