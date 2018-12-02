import Vue from 'vue';
import VueToasted from 'vue-toasted';

Vue.use(VueToasted, {
    iconPack : 'material' // set your iconPack, defaults to material. material|fontawesome|custom-class
});

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

// Custom Class Icon Pack
Vue.use(VueToasted, {
    iconPack: 'custom-class' // set your iconPack, defaults to material. material|fontawesome|custom-class
});

// append any class to the toaster icon
Vue.toasted.show(
    'hello there, i am a toast !!', {
        icon: {
            name: 'fal fa-check fa-spin fa-fw',
        }
});


// Callback as icon pack
Vue.use(VueToasted, {
	iconPack: 'callback'
});


Vue.toasted.show(
    'hello there, i am a toast !!', {
    // el is icon html element you can play with it
    icon: (el) => {
        el.innerText = 'my icon logic';
        return el;
    }
});
