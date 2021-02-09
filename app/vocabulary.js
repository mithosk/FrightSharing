'use strict';

import i18n from 'react-native-i18n';

i18n.translations = {
    it: {
        home_search_new: "le nuove storie",
        home_search_best: "i migliori spaventi",
        home_search_near: "esperienze nei dintorni",
        home_search_mine: "i miei racconti"
    },
    en: {
        home_search_new: "le nuove storie",
        home_search_best: "i migliori spaventi",
        home_search_near: "esperienze nei dintorni",
        home_search_mine: "i miei racconti"
    }
};

i18n.fallbacks = true;

module.exports.translate = function (key) {
    return i18n.t(key);
}