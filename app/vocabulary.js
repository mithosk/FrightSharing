'use strict';

import I18n from 'react-native-i18n';

I18n.translations = {
    it: {
        addstory_header_title: "Nuova storia",
        addstory_body_publish: "Pubblica questa storia",

        home_search_new: "Le nuove storie",
        home_search_best: "I migliori spaventi",
        home_search_near: "Esperienze nei dintorni",
        home_search_mine: "I miei racconti"
    },
    en: {
        addstory_header_title: "New story",
        addstory_body_publish: "Publish this story",

        home_search_new: "New stories",
        home_search_best: "The best frights",
        home_search_near: "Experiences around here",
        home_search_mine: "My tales"
    }
};

I18n.fallbacks = true;

module.exports.translate = function (key) {
    return I18n.t(key);
}