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
            height: 350,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center"
        }

    });