'use strict';

import { style } from '../style';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import React, { Component } from 'react';
import { Icon, Button } from 'react-native-elements';

export default class HomeActivity extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Modal isVisible={this.props.route.params.searchModal} animationInTiming={1} animationOutTiming={1}>
          <View style={style.SearchModal}>
            <View style={{ width: "90%", marginTop: 0 }}>
              <Button buttonStyle={style.Button} icon={<Icon type="feather" name="clock" size={45} />} title="LE NUOVE STORIE" titleStyle={style.ButtonTitle} onPress={() => this.props.navigation.navigate("home", { searchModal: false, searchMode: "new" })} />
            </View>
            <View style={{ width: "90%", marginTop: 10 }}>
              <Button buttonStyle={style.Button} icon={<Icon type="feather" name="thumbs-up" size={45} />} title="I MIGLIORI SPAVENTI" titleStyle={style.ButtonTitle} onPress={() => this.props.navigation.navigate("home", { searchModal: false, searchMode: "best" })} />
            </View>
            <View style={{ width: "90%", marginTop: 10 }}>
              <Button buttonStyle={style.Button} icon={<Icon type="feather" name="map-pin" size={45} />} title="ESPERIENZE VICINE A ME" titleStyle={style.ButtonTitle} onPress={() => this.props.navigation.navigate("home", { searchModal: false, searchMode: "near" })} />
            </View>
            <View style={{ width: "90%", marginTop: 10 }}>
              <Button buttonStyle={style.Button} icon={<Icon type="feather" name="user" size={45} />} title="I MIEI RACCONTI" titleStyle={style.ButtonTitle} onPress={() => this.props.navigation.navigate("home", { searchModal: false, searchMode: "mine" })} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

}