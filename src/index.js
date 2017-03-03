import { initPlugin } from './toast';

export default {
    install: (Vue, options) => {
        initPlugin(Vue, options)
    }
};
