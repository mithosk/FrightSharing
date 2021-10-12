'use strict';

import createGuid from 'react-native-create-guid';
import AsyncStorage from '@react-native-async-storage/async-storage';

module.exports.post = async function (body) {
    body.id = await createGuid();
    body.date = new Date();

    var stories = [];
    var json = await AsyncStorage.getItem("stories");
    if (json != null)
        stories = JSON.parse(json);

    stories.push(body);

    await AsyncStorage.setItem("stories", JSON.stringify(stories));
}

module.exports.list = async function (filter) {
    var stories = [];
    var json = await AsyncStorage.getItem("stories");
    if (json != null)
        stories = JSON.parse(json);

    var result = [];
    var from = (filter.pageIndex - 1) * filter.pageSize;
    if (from < stories.length) {
        var to = from + filter.pageSize - 1;
        if (to >= stories.length)
            to = stories.length - 1;

        for (var i = from; i <= to; i++)
            result.push(stories[i]);
    }

    return result;
}