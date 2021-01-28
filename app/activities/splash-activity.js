'use strict';

import { style } from '../style';
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';

export default class SplashActivity extends Component {

  constructor(props) {
    super(props);

    this.startup();
  }

  render() {
    return (
      <View style={style.SplashBody}>
        <Image source={require('../images/logo.png')} style={{ width: 200, height: 200 }} />
      </View>
    );
  }

  startup = () => {
    setTimeout(() => {
      this.props.navigation.navigate('home', { searchModal: false });

      this.props.navigation.dispatch(state => {
        var routes = state.routes.filter(route => route.name !== 'splash');

        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    },
      4000);
  }

}