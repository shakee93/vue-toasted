import ToastComponent from './toast.vue';
import Toast from './toast';

export default {
    install: (Vue, options) => {

        Vue.component('toasted', ToastComponent);

        Vue.prototype.$toasted = function () {
            console.info("Please Initiate the <toasted> component first");
        };

        Vue.mixin({
            mounted(){
                if(this.$options.name == 'toasted') {
                    Toast.setGlobalOptions(options);
                    Vue.prototype.$toasted = Toast;
                }
            }
        });
    }
};
