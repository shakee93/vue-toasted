<p align="center">
    <a href="https://github.com/shakee93/vue-toasted" target="_blank">
    <img width="250"src="https://freshpixl.com/vue-toasted.png?new">
    </a>
</p> 

<p align="center">
  <a href="https://www.npmjs.com/package/vue-toasted"><img src="https://img.shields.io/npm/v/vue-toasted.svg?style=flat-square"/> <img src="https://img.shields.io/npm/dm/vue-toasted.svg?style=flat-square"/></a>
  <a href="https://github.com/vuejs/awesome-vue"><img src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg"/></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg?style=flat-square"/></a>
  <a href="https://github.com/shakee93/vue-toasted/"><img src="http://img.badgesize.io/shakee93/vue-toasted/master/dist/vue-toasted.min.js?compression=gzip&style=flat-square"/></a>
  <a href="http://packagequality.com/#?package=vue-toasted"><img src="http://npm.packagequality.com/shield/vue-toasted.svg?style=flat-square"/></a>
 </p>

## Introduction

Vue Toasted is One of the Best Toast plugin available for VueJS. it is used by VueJS, Laravel, NuxtJS and trusted by many more organizations it is responsive, touch compatible, easy to use, attractive and feature rich with icons, actions etc...

#### Interactive Demo

Checkout the <a target="_blank" href="https://shakee93.github.io/vue-toasted/"> Interactive Demo </a> here.

<p align="center">
    <img src="https://shakee93.github.io/vue-toasted/assets/images/vue-toasted-demo-x3.gif">
</p>

#### Menu

- [Installation](#installation)
    - [Npm](#install-using-npm)
    - [Yarn](#install-using-yarn)
    - [Direct Usage](#direct-usage-with-html)
    - [Nuxt](#nuxt--officially-uses-vue-toasted-for-their-toast-module)
- [Usage](#usage)
    - [Basic Usage](#usage)
    - [Actions](#actions--fire)
    - [Icons](#icons-fire)
    - [Standalone Usage](#browsers-support)
- [Api](#api)
    - [Options](#options)
    - [Methods](#methods)
    - [Toast Object](#toast-object)
    - [Custom Toast Registration](#custom-toast-registration)
    - [Vue Router](#vue-router)
- [Browser Support](#browsers-support)
- [Mobile Responsiveness](#mobile-responsiveness)
- [Credits](#credits)


## Installation

#### Install using npm
```bash
# install it via npm
npm install vue-toasted --save
```

#### Install using yarn
```bash
# install it via yarn
yarn add vue-toasted
```

#### Direct usage with html
```html
<!-- Insert the vue core before vue-toasted -->
<script src="https://unpkg.com/vue-toasted"></script>

<script>
    Vue.use(Toasted)
</script>
```

<hr>

#### [Nuxt](https://github.com/nuxt/nuxt.js) 💓 Officially uses `vue-toasted` for their toast module.

installation guide 👉  [@nuxtjs/toast](https://github.com/nuxt-community/modules/tree/master/packages/toast)

## Usage

It is simple. couple of lines all what you need.

```javascript
// register the plugin on vue
import Toasted from 'vue-toasted';

Vue.use(Toasted)

// you can also pass options, check options reference below
Vue.use(Toasted, Options)

```

```javascript
// you can call like this in your component
this.$toasted.show('hello billo')

// and also
Vue.toasted.show('hola billo');
```

All Good Now you have this cool toast in your project..


### Icons :fire:
[Material Icons](http://google.github.io/material-design-icons/), [Fontawesome](http://fontawesome.io/cheatsheet/) and [Material Design Icons](https://materialdesignicons.com/) are supported. you will have to import the icon packs into your project. <a href="/examples/using-icons.js"> example using icons </a>

```javascript
{
    // pass the icon name as string
    icon : 'check'
    
    // or you can pass an object
    icon : {
        name : 'watch',
        after : true // this will append the icon to the end of content
    }
}
```

### Actions  :fire:
<p align="center">
    <a href="https://github.com/shakee93/vue-toasted" target="_blank">
    <img width="300" src="https://shakee93.github.io/vue-toasted/assets/images/action-preview.jpg">
    </a>
</p> 
<p>You can have single or multiple actions in the toast. take a look at the example below</p>
<p>Check below Vue Router section for router integration</p>

**Parameters**|**Type's**|**Default**|**Description**
-----|-----|-----|-----
text*|String|-| name of action
href|String|`null`| url of action
icon|String|`null`| name of material for action
target|String|`null`| target of url
class|String/Array|`null`| custom css class for the action
push|Object |`null`|  Vue Router push parameters
onClick|Function(e,toastObject) |`null`|  onClick Function of action

##### Examples
```javascript
{
    // you can pass a single action as below
    action : {
        text : 'Cancel',
        onClick : (e, toastObject) => {
            toastObject.goAway(0);
        }
    },

    // you can pass a multiple actions as an array of actions
    action : [
        {
            text : 'Cancel',
            onClick : (e, toastObject) => {
                toastObject.goAway(0);
            }
        },
        {
            text : 'Undo',
            // router navigation
            push : { 
            	name : 'somewhere',
            	// this will prevent toast from closing
            	dontClose : true
             }
        }
    ]
}
```


## API

### Options

below are the options you can pass to create a toast

**Option**|**Type's**|**Default**|**Description**
-----|-----|-----|-----
position|String|'top-right'|Position of the toast container <br> **['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left']**
duration|Number|null|Display time of the toast in millisecond
keepOnHover|Boolean|false|When mouse is over a toast's element, the corresponding `duration` timer is paused until the cursor leaves the element
action|Object, Array|null|Add single or multiple actions to toast  [explained here](#actions--fire)
fullWidth|Boolean|false|Enable Full Width
fitToScreen|Boolean|false|Fits to Screen on Full Width
className|String, Array|null|Custom css class name of the toast
containerClass|String, Array|null|Custom css classes for toast container
iconPack|String|'material'| Icon pack type to be used <br> **['material', 'fontawesome', 'mdi', 'custom-class', 'callback']**
Icon|String, Object|null|Material icon name as string.  [explained here](#icons-fire)
type|String|'default'| Type of the Toast  **['success', 'info', 'error']**
theme|String|'toasted-primary'|Theme of the toast you prefer<br> **['toasted-primary', 'outline', 'bubble']**
onComplete|Function|null|Trigger when toast is completed
closeOnSwipe|Boolean|true|Closes the toast when the user swipes it
singleton|Boolean|false| Only allows one toast at a time.

### Methods

Methods available on Toasted...

```javascript
// you can pass string or html to message
Vue.toasted.show( 'my message', { /* some option */ })
```

**Method**|**Parameter's**|**Description**
-----|-----|-----
show|message, options| show a toast with default style
success|message, options| show a toast with success style
info|message, options| show a toast with info style
error|message, options | show a toast with error style
register | name, message, options | register your own toast with options [explained here](#custom-toast-registration) 
clear | - | clear all toasts

### Toast Object
Each Toast Returns a Toast Object where you can manipulate the toast.

```javascript

// html element of the toast
el : HtmlElement

// change text or html of the toast
text : Function(text)

// fadeAway the toast. default delay will be 800ms
goAway : Function(delay = 800)

```

using the toast object

```javascript
let myToast = this.$toasted.show("Holla !!");
myToast.text("Changing the text !!!").goAway(1500);
```


### Vue Router

Adding vue-router to vue-toasted where you can use it on toast actions.

```javascript

// your app router instance
var router = new VueRouter({
	mode: 'history',
	routes: [{
		path: '/foo',
		name : 'foo-name'
	}],
	linkActiveClass: "active"
});

// pass it to vue toasted as below..
Vue.use(Toasted, {
	router
});
```

### Custom Toast Registration

You can register your own toasts like below and it will be available all over the application.

`Toasted.register` methods api details...

**Parameters**|**Type's**|**Default**|**Description**
-----|-----|-----|-----
name*|String|-| name of your toast
message*|String/Function(payload) |-|  Toast Body Content
options|String/Object| {} | Toast Options as Object or either of these strings **['success', 'info', 'error']**

Take a look at the below examples

##### Simple Example 
```javascript
import Toasted from 'vue-toasted';
Vue.use(Toasted);

// Lets Register a Global Error Notification Toast.
Vue.toasted.register('my_app_error', 'Oops.. Something Went Wrong..', {
    type : 'error',
    icon : 'error_outline'
})
```

After Registering your toast you can easily access it in the vue component like below

```javascript
// this will show a toast with message 'Oops.. Something Went Wrong..'
// all the custom toasts will be available under `toasted.global`
this.$toasted.global.my_app_error();
```

##### Advanced Example 

You can also pass message as a function. which will give you more power.
Lets think you need to pass a custom message to the error notification we built above.

```javascript
this.$toasted.global.my_app_error({
    message : 'Not Authorized to Access'
});
```
you can register a toast with payload like below on the example.

```javascript
import Toasted from 'vue-toasted';
Vue.use(Toasted);

// options to the toast
let options = {
    type : 'error',
    icon : 'error_outline'
};

// register the toast with the custom message
Vue.toasted.register('my_app_error',
    (payload) => {
		
        // if there is no message passed show default message
        if(! payload.message) {
    	    return "Oops.. Something Went Wrong.."
        }
		
        // if there is a message show it with the message
        return "Oops.. " + payload.message;
    },
    options
)
```


#### Browsers support

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/opera.png" alt="Opera" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari-ios.png" alt="iOS Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome-android.png" alt="Chrome for Android" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome for Android |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 7 versions| last 7 versions| last 7 versions| last 7 versions| last 3 versions| last 3 versions

Please Report If You have Found any Issues.

### Mobile Responsiveness

On Mobile Toasts will be on full width. according to the position the toast will either be on top or bottom.


### Credits

+ Inspired and developed from [materialize-css](https://github.com/Dogfalo/materialize) toast.
+ Uses [hammerjs](http://hammerjs.github.io/) for touch events
+ Uses lightweight and fast [animejs](http://animejs.com/) for animations.
+ Whoever contributes to this project :wink:

Enjoy Toasting !!
