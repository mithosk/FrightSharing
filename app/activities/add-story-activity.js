'use strict';

import { style } from '../style';
import { View } from 'react-native';
import React, { Component } from 'react';
import { translate } from '../vocabulary';
import { Icon, Button } from 'react-native-elements';

export default class AddStoryActivity extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.AddStoryBody}>
        <View style={{ width: "95%", marginTop: 25 }}>
          <Button buttonStyle={style.Button} icon={<Icon type="feather" name="share" size={40} />} title={translate("addstory_body_publish")} titleStyle={style.ButtonTitle} onPress={this.publish} />
        </View>
      </View>
    );
  }

  publish = () => {
    this.props.navigation.navigate("home", { searchModal: false, searchMode: "mine" });
  }

}