import { initPlugin } from './js/toast';

const Toasted = {
    install: (Vue, options) => {
        initPlugin(Vue, options)
    }
};

// register plugin if it is used via cdn or directly as a script tag
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Toasted);
}

export default Toasted