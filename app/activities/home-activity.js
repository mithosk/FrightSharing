'use strict';

import { style } from '../style';
import Modal from 'react-native-modal';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class HomeActivity extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Modal isVisible={this.props.route.params.searchModal} animationType="slideInDown">
          <View style={style.SearchModal}>
            <Text onPress={() => this.props.navigation.navigate('home', { searchModal: false })}>Leonardo Nicolini Bello!!</Text>
          </View>
        </Modal>
      </View>
    );
  }

}