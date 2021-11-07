'use strict';

import { style } from '../style';
import I18n from 'react-native-i18n';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import React, { Component } from 'react';
import { translate } from '../vocabulary';
import GetLocation from 'react-native-get-location';
import moment from 'moment/min/moment-with-locales';
import { Icon, Button } from 'react-native-elements';
import storyRepository from '../repositories/story-repository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Text, ActivityIndicator, View, TouchableOpacity, RefreshControl } from 'react-native';

export default class HomeActivity extends Component {

  constructor(props) {
    super(props);

    this.pageSize = 5;
    this.synchDelay = 65;

    this.state = {
      stories: [],
      pageIndex: 1,
      nextPage: false,
      mainLoader: false,
      refreshLoader: false
    };

    this.props.navigation.addListener("focus", () => {
      this.setState({
        pageIndex: 1,
        mainLoader: true
      },
        this.compileStories
      );
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.props.route.params.searchModal} animationInTiming={1} animationOutTiming={1}>
          <View style={style.HomeSearchModal}>
            <View style={{ width: "90%", marginTop: 1 }}>
              <Button buttonStyle={style.ButtonLight} icon={<Icon type="feather" name="clock" size={40} />} title={translate("home_search_new")} titleStyle={style.ButtonTitle} onPress={() => this.changeSearchMode("new")} />
            </View>
            <View style={{ width: "90%", marginTop: 10 }}>
              <Button buttonStyle={style.ButtonLight} icon={<Icon type="feather" name="thumbs-up" size={40} />} title={translate("home_search_best")} titleStyle={style.ButtonTitle} onPress={() => this.changeSearchMode("best")} />
            </View>
            <View style={{ width: "90%", marginTop: 10 }}>
              <Button buttonStyle={style.ButtonLight} icon={<Icon type="feather" name="map-pin" size={40} />} title={translate("home_search_near")} titleStyle={style.ButtonTitle} onPress={() => this.changeSearchMode("near")} />
            </View>
            <View style={{ width: "90%", marginTop: 10 }}>
              <Button buttonStyle={style.ButtonLight} icon={<Icon type="feather" name="user" size={40} />} title={translate("home_search_mine")} titleStyle={style.ButtonTitle} onPress={() => this.changeSearchMode("mine")} />
            </View>
          </View>
        </Modal>
        <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
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
                    <Icon type="feather" name="share-2" onPress={() => this.share(item.title, item.tale)} />
                  </View>
                  <View style={{ width: 60 }}>
                    <Icon type="feather" name="heart" onPress={() => alert("LIKE")} />
                  </View>
                  <View style={{ width: 60 }}>
                    <Icon type="feather" name="thumbs-down" onPress={() => alert("UNLIKE")} />
                  </View>
                </View>
              </View>
            )
          }
          onEndReached={this.goToNextPage}
          refreshing={true}
          refreshControl=
          {
            <RefreshControl
              colors={[style.Loader.color, "#0000FF", "#FF0000", "#FFFF00", "#F60EBE"]}
              refreshing={this.state.refreshLoader}
              onRefresh={(this.goToFirstPage)} />
          } />
        {
          this.state.mainLoader ?
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
      var filter = new Object();
      filter.pageIndex = this.state.pageIndex;
      filter.pageSize = this.pageSize * (this.state.pageIndex == 1 ? 2 : 1);

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

        var repoStories = await storyRepository.list(filter);

        var stateStories = [];
        if (this.state.pageIndex > 1) {
          stateStories = this.state.stories;
          for (var i = 0; i < repoStories.length; i++)
            stateStories.shift();
        }

        for (var i = 0; i < repoStories.length; i++)
          stateStories.push(repoStories[i]);

        this.setState({
          stories: stateStories,
        },
          () => {
            if (stateStories.length > 0) {
              var index = stateStories.length - repoStories.length - 2;
              index = index < 0 ? 0 : index;

              this.flatListRef.scrollToIndex({ animated: false, index: index });
            }

            setTimeout(() => {
              this.setState({
                nextPage: repoStories.length == filter.pageSize,
                mainLoader: false,
                refreshLoader: false
              });
            },
              this.synchDelay
            );
          });
      }
      catch (e) {
        this.setState({
          nextPage: false,
          mainLoader: false,
          refreshLoader: false
        });

        alert(e);
      }
    }
  }

  changeSearchMode = async (searchMode) => {
    this.props.route.params.searchMode = searchMode;
    this.props.route.params.searchModal = false;

    this.setState({
      pageIndex: 1,
      nextPage: false,
      mainLoader: true
    },
      this.compileStories
    );
  }

  goToFirstPage = () => {
    this.setState({
      pageIndex: 1
    },
      this.compileStories
    );
  }

  goToNextPage = () => {
    if (this.state.nextPage) {
      this.setState({
        pageIndex: this.state.pageIndex + (this.state.pageIndex == 1 ? 2 : 1),
        nextPage: false,
        mainLoader: true
      },
        this.compileStories
      );
    }
  }

  share = async (title, tale) => {
    try {
      await Share.open({
        title: title.toUpperCase(),
        message: tale
      });
    } catch { }
  }

}