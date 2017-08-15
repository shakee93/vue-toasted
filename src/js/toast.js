import ToastComponent from '../toast.vue';
import show from './show';

/**
 * Global Options
 * @type Object
 */
let globalOptions = {};

/**
 * Initiate the Plugin
 * @param Vue
 * @param options
 */
export const initPlugin = function (Vue, options) {
    Toast.setGlobalOptions(options);
    Toast.init();
    Vue.component('toasted', ToastComponent);
    Vue.toasted = Vue.prototype.$toasted = Toast;
};

/**
 * Toast Object
 */
export const Toast = {
    el: null,
    init: () => {
        initiateCustomToasts();
    },
	register : (name, payload, options) => {
		options = options || {};
		return register(name, payload, options);
	},
    show: (message, options) => {
        return _show(message, options);
    },
    success :  (message, options) => {
        options = options || {};
        options.type = "success";
        return _show(message, options);
    },
    info :  (message, options) => {
        options = options || {};
        options.type = "info";
        return _show(message, options);
    },
    error :  (message, options) => {
        options = options || {};
        options.type = "error";
        return _show(message, options);
    },
    global: {},
    setGlobalOptions: (options) => {
        globalOptions = options || {};
    }
};

/**
 * Wrapper for show method in order to manipulate options
 *
 * @param message
 * @param options
 * @returns {*}
 * @private
 */
export const _show = function (message, options) {
    options = options || {};

    if (typeof options !== "object") {
        console.error("Options should be a type of object. given : " + options);
        return null;
    }

    // merge global options with options
    // JSON.parse is to protect globalOptions from overriding.
    let _cachedGlobalOptions = JSON.parse(JSON.stringify(globalOptions));
    Object.assign(_cachedGlobalOptions, options);
    options = _cachedGlobalOptions;

    return show(message, options);
};

/**
 * Register the Custom Toasts
 */
export const initiateCustomToasts = function () {

    let customToasts = globalOptions.globalToasts;

    // this will initiate toast for the custom toast.
    let initiate = (message, options) => {

        // check if passed option is a available method if so call it.
        if(typeof(options) === 'string' && Toast[options]) {
           return Toast[options].apply(Toast, [message, {}]);
        }

        // or else create a new toast with passed options.
        return _show(message, options);
    };

    if(customToasts) {

	    Toast.global = {};

        Object.keys(customToasts).forEach( key => {

            // register the custom toast events to the Toast.custom property
            Toast.global[key] = (payload = {}) => {

                // return the it in order to expose the Toast methods
                return customToasts[key].apply(null, [ payload, initiate ]);
            };
        });

        // remove customToasts after mocking the methods.
        delete globalOptions.customToasts;
    }
};

const register = function (name, message, options) {

	(!globalOptions.globalToasts) ? globalOptions.globalToasts = {} : null;

	globalOptions.globalToasts[name] = function (payload, initiate) {

		if(typeof message === 'function') {
			message = message(payload);
		}

		return initiate(message, options);
	};

	initiateCustomToasts();
}

export default {initPlugin, Toast} ;

