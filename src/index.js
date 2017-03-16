import { initPlugin } from './toast';

const Toasted = {
    install: (Vue, options) => {
        initPlugin(Vue, options)
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Toasted);
}

export default Toasted