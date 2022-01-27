'use strict';

import GetLocation from 'react-native-get-location';

var location = null;

module.exports.localize = async function () {
    try {
        location = await GetLocation.getCurrentPosition({
            timeout: 10000,
            enableHighAccuracy: true
        });
    }
    catch (e) {
        if (location == null)
            throw e;
    }

    return location;
}