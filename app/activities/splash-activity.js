'use strict';

import { style } from '../style';
import React, { Component } from 'react';
import { View, Image } from 'react-native';

export default class SplashActivity extends Component {

  constructor() {
    super();

    setTimeout(() => this.props.navigation.navigate('home'), 4000);
  }

  render() {
    return (
      <View style={style.SplashBody}>
        <Image source={require('../images/logo.png')} style={{ width: 200, height: 200 }} />
      </View>
    );
  }

}