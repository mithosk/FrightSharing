'use strict';

import I18n from 'react-native-i18n';

I18n.translations = {
    it: {

        addstory_header_title: "Nuova storia",
        addstory_body_title: "Dai un titolo alla storia",
        addstory_body_titleerr: "Compilazione richiesta",
        addstory_body_tale: "Racconta la storia",
        addstory_body_taleerr: "Compilazione richiesta",
        addstory_footer_publish: "Pubblica questa storia",

        home_search_new: "Le nuove storie",
        home_search_best: "I migliori spaventi",
        home_search_near: "Esperienze nei dintorni",
        home_search_mine: "I miei racconti"

    }
};

I18n.fallbacks = true;

module.exports.translate = function (key) {
    return I18n.t(key);
}