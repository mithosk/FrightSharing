'use strict';

import { style } from '../style';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import React, { Component } from 'react';
import { translate } from '../vocabulary';
import { Icon, Button } from 'react-native-elements';

export default class HomeActivity extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal isVisible={this.props.route.params.searchModal} animationInTiming={1} animationOutTiming={1}>
        <View style={style.HomeSearchModal}>
          <View style={{ width: "90%", marginTop: 1 }}>
            <Button buttonStyle={style.ButtonLight} icon={<Icon type="feather" name="clock" size={45} />} title={translate("home_search_new")} titleStyle={style.ButtonTitle} onPress={() => this.props.navigation.navigate("home", { searchModal: false, searchMode: "new" })} />
          </View>
          <View style={{ width: "90%", marginTop: 10 }}>
            <Button buttonStyle={style.ButtonLight} icon={<Icon type="feather" name="thumbs-up" size={45} />} title={translate("home_search_best")} titleStyle={style.ButtonTitle} onPress={() => this.props.navigation.navigate("home", { searchModal: false, searchMode: "best" })} />
          </View>
          <View style={{ width: "90%", marginTop: 10 }}>
            <Button buttonStyle={style.ButtonLight} icon={<Icon type="feather" name="map-pin" size={45} />} title={translate("home_search_near")} titleStyle={style.ButtonTitle} onPress={() => this.props.navigation.navigate("home", { searchModal: false, searchMode: "near" })} />
          </View>
          <View style={{ width: "90%", marginTop: 10 }}>
            <Button buttonStyle={style.ButtonLight} icon={<Icon type="feather" name="user" size={45} />} title={translate("home_search_mine")} titleStyle={style.ButtonTitle} onPress={() => this.props.navigation.navigate("home", { searchModal: false, searchMode: "mine" })} />
          </View>
        </View>
      </Modal>
    );
  }

}