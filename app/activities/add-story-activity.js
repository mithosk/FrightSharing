'use strict';

import { style } from '../style';
import I18n from 'react-native-i18n';
import React, { Component } from 'react';
import { translate } from '../vocabulary';
import GetLocation from 'react-native-get-location';
import { View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon, Button, Input } from 'react-native-elements';

export default class AddStoryActivity extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      titleErr: "",
      tale: "",
      taleErr: "",
      loader: false
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ marginTop: 30 }}>
          <Input placeholder={translate("addstory_body_title")} errorMessage={this.state.titleErr} errorStyle={style.ErrorLabel} maxLength={42} onChangeText={text => this.setState({ title: text })} />
          <Input placeholder={translate("addstory_body_tale")} errorMessage={this.state.taleErr} errorStyle={style.ErrorLabel} multiline={true} onChangeText={text => this.setState({ tale: text })} />
        </ScrollView>
        <View>
          <Button buttonStyle={style.ButtonDark} icon={<Icon type="feather" name="share" size={40} />} title={translate("addstory_footer_publish")} titleStyle={style.ButtonTitle} onPress={this.publish} />
        </View>
        {
          this.state.loader ?
            <View style={style.LoaderOverlay}>
              <ActivityIndicator size={style.Loader.width} color={style.Loader.color} />
            </View>
            : null
        }
      </View>
    );
  }

  publish = async () => {
    var validTitle = this.state.title.length > 0;
    var validTale = this.state.tale.length > 0;

    this.setState({
      titleErr: !validTitle ? translate("addstory_body_titleerr") : "",
      taleErr: !validTale ? translate("addstory_body_taleerr") : "",
    });

    if (validTitle & validTale) {
      this.setState({ loader: true });

      var location = await GetLocation.getCurrentPosition();

      var model = new Object();
      model.language = I18n.currentLocale();
      model.title = this.state.title;
      model.tale = this.state.tale;
      model.latitude = location.latitude;
      model.longitude = location.longitude;

      alert(JSON.stringify(model));
      this.props.navigation.navigate("home", { searchModal: false, searchMode: "new" });
    }
  }

}