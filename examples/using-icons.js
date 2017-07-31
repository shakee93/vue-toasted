import Vue from 'vue';
import VueToasted from 'vue-toasted';

Vue.use(VueToasted);

/* NOTE : You will have to import material icons in order to work */

// use icon name as a string
Vue.toasted.show('hello there, i am a toast !!', { icon : 'check'});

// you can pass an object and use name
Vue.toasted.show(
    'hello there, i am a toast !!', {
        icon : {
            name : 'check'
        }
});

// use after to append the icon after the content
Vue.toasted.show(
    'hello there, i am a toast !!', {
        icon : {
            name : 'check',
            after : true
        }
});
