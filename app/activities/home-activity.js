'use strict';

import { style } from '../style';
import I18n from 'react-native-i18n';
import Modal from 'react-native-modal';
import React, { Component } from 'react';
import { translate } from '../vocabulary';
import GetLocation from 'react-native-get-location';
import moment from 'moment/min/moment-with-locales';
import { Icon, Button } from 'react-native-elements';
import storyRepository from '../repositories/story-repository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Text, ActivityIndicator, View, TouchableOpacity } from 'react-native';

export default class HomeActivity extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      pageIndex: 1,
      loader: false,
    };

    this.props.navigation.addListener('focus', async () => {
      await this.compileStories();
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.props.route.params.searchModal} animationInTiming={1} animationOutTiming={1}>
          <View style={style.HomeSearchModal}>
            <View style={{ width: "90%", marginTop: 1 }}>
              <Button buttonStyle={style.ButtonLight} icon={<Icon type="feather" name="clock" size={45} />} title={translate("home_search_new")} titleStyle={style.ButtonTitle} onPress={() => this.changeSearchMode("new")} />
            </View>
            <View style={{ width: "90%", marginTop: 10 }}>
              <Button buttonStyle={style.ButtonLight} icon={<Icon type="feather" name="thumbs-up" size={45} />} title={translate("home_search_best")} titleStyle={style.ButtonTitle} onPress={() => this.changeSearchMode("best")} />
            </View>
            <View style={{ width: "90%", marginTop: 10 }}>
              <Button buttonStyle={style.ButtonLight} icon={<Icon type="feather" name="map-pin" size={45} />} title={translate("home_search_near")} titleStyle={style.ButtonTitle} onPress={() => this.changeSearchMode("near")} />
            </View>
            <View style={{ width: "90%", marginTop: 10 }}>
              <Button buttonStyle={style.ButtonLight} icon={<Icon type="feather" name="user" size={45} />} title={translate("home_search_mine")} titleStyle={style.ButtonTitle} onPress={() => this.changeSearchMode("mine")} />
            </View>
          </View>
        </Modal>
        <FlatList
          data={this.state.stories}
          renderItem=
          {
            ({ item }) => (
              <View style={style.StoryListItem}>
                <TouchableOpacity onPress={() => alert("OPEN")}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: 40 }}>
                      <Icon type="feather" name="user" />
                    </View>
                    <Text style={style.StoryListTitle}>{item.title}</Text>
                  </View>
                  <Text style={style.StoryListTime}>{moment(item.date).locale(I18n.currentLocale()).fromNow()}</Text>
                  <Text style={style.StoryListTale} numberOfLines={8}>{item.tale}</Text>
                </TouchableOpacity>
                <View style={style.StoryListSubsection}>
                  <View style={{ width: 60 }}>
                    <Icon type="feather" name="share-2" onPress={() => alert("SHARE")} />
                  </View>
                  <View style={{ width: 60 }}>
                    <Icon type="feather" name="thumbs-up" onPress={() => alert("LIKE")} />
                  </View>
                  <View style={{ width: 60 }}>
                    <Icon type="feather" name="thumbs-down" onPress={() => alert("UNLIKE")} />
                  </View>
                </View>
              </View>
            )
          } />
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

  compileStories = async () => {
    if (this.props.route.params.searchMode != "none") {
      this.setState({ loader: true });

      var filter = new Object();

      try {
        var location = await GetLocation.getCurrentPosition({
          timeout: 10000,
          enableHighAccuracy: true
        });

        switch (this.props.route.params.searchMode) {
          case "new":
            filter.orderBy = "date";
            break;

          case "best":
            filter.orderBy = "score";
            break;

          case "near":
            filter.latitude = location.latitude;
            filter.longitude = location.longitude;
            filter.orderBy = "date";
            break;

          case "mine":
            filter.userId = await AsyncStorage.getItem("userId");
            filter.orderBy = "date";
            break;
        }

        filter.pageIndex = this.state.pageIndex;
        filter.pageSize = 15;

        var repoStories = await storyRepository.list(filter);

        this.setState({
          stories: repoStories,
          loader: false
        });
      }
      catch (e) {
        this.setState({ loader: false });
        alert(e);
      }
    }
  }

  changeSearchMode = async (searchMode) => {
    this.props.route.params.searchMode = searchMode;
    this.props.route.params.searchModal = false;

    await this.compileStories();
  }

}