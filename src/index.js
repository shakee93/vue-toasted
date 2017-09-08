import { Toasted as t } from './js/toast';
import ToastComponent from './toast.vue';

const Toasted = {
    install: (Vue, options) => {
        let Toast = new t(options)
	    Vue.component('toasted', ToastComponent);
	    Vue.toasted = Vue.prototype.$toasted = Toast;
    }
};

// register plugin if it is used via cdn or directly as a script tag
if (typeof window !== 'undefined' && window.Vue) {
    window.Toasted = Toasted;
}

export default Toasted