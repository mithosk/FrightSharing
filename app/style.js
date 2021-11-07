'use strict';

import { StyleSheet } from 'react-native';

export const style = StyleSheet.create(
    {

        StatusBar: {
            backgroundColor: "#04B486"
        },

        Header: {
            backgroundColor: "#04B486"
        },

        ButtonLight: {
            backgroundColor: "#EDEDED"
        },

        ButtonDark: {
            backgroundColor: "#C8C8C8"
        },

        ButtonTitle: {
            color: "#000000",
            fontSize: 16,
            marginLeft: 20,
            textTransform: "uppercase"
        },

        ErrorLabel: {
            color: "#D70000",
            fontWeight: "bold",
            textTransform: "uppercase"
        },

        Loader: {
            width: 60,
            color: "#04B486",
        },

        LoaderOverlay: {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            justifyContent: "center"
        },

        StoryListItem: {
            backgroundColor: "#FFFFFF",
            padding: 20,
            marginTop: 11
        },

        StoryListTitle: {
            fontSize: 15,
            fontWeight: "bold",
            textTransform: "uppercase"
        },

        StoryListTime: {
            fontSize: 12
        },

        StoryListTale: {
            fontSize: 15,
            textAlign: "justify",
            marginTop: 15,
            textTransform: "lowercase"
        },

        StoryListSubsection: {
            paddingTop: 17,
            marginTop: 10,
            borderTopWidth: 1,
            borderTopColor: "#C8C8C8",
            flexDirection: "row"
        },

        SplashBody: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#04B486"
        },

        HomeHeaderTitle: {
            fontFamily: "Spicy Pumpkin",
            fontSize: 25
        },

        HomeSearchModal: {
            height: 300,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center"
        }

    });