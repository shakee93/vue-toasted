'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toast = require('./toast.vue');

var _toast2 = _interopRequireDefault(_toast);

var _toast3 = require('./toast');

var _toast4 = _interopRequireDefault(_toast3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toasted = {
    install: function install(Vue, options) {

        Vue.component('toasted', _toast2.default);

        Vue.prototype.$toasted = function () {
            console.info("Please Initiate the <toasted> component first");
        };

        Vue.mixin({
            mounted: function mounted() {
                if (this.$options.name == 'toasted') {
                    _toast4.default.setGlobalOptions(options);
                    Vue.prototype.$toasted = _toast4.default;
                }
            }
        });
    }
};

exports.default = Toasted;