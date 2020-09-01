import { Toasted as T } from './js/toast';
import ToastComponent from './toast.vue';
import { VueToastedSymbol } from './useApi';
export * from './useApi';

const VueToastedPlugin = {
  install(app, options) {
    if (!options) {
      options = {};
    }
    const Toast = new T(options);
    app.component('toasted', ToastComponent);
    app.config.globalProperties.$toasted = Toast;
    app.provide(VueToastedSymbol, Toast);
  },
};

export default VueToastedPlugin;
