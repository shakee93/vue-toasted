<p align="center">
    <a href="https://github.com/shakee93/vue-toasted" target="_blank">
    <img width="250"src="https://freshpixl.com/vue-toasted.png?new">
    </a>
</p> 

<p align="center">
  <a href="https://www.npmjs.com/package/vue-toasted"><img src="https://img.shields.io/npm/v/vue-toasted.svg"/> <img src="https://img.shields.io/npm/dm/vue-toasted.svg"/></a>
  <a href="https://github.com/vuejs/awesome-vue"><img src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg"/></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg"/></a>
</p>

## Introduction

vue-toasted is a cool material toast plugin with variety of options and styles. it is touch compatible and responsive.
issues and pr's are always welcome 

Checkout the <a target="_blank" href="https://shakee93.github.io/vue-toasted/"> Interactive Demo </a> here.

<p align="center">
    <img src="https://shakee93.github.io/vue-toasted/assets/images/vue-toasted-demo-x3.gif">
</p>
 
## Usage

It is simple. couple of lines all what you need.

```bash
# install it via npm
npm install vue-toasted --save
```
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

All Good Now you have this cool toast in your project.. let's take a look at the api

## API

vue-toasted has methods which makes it much easier to use

### methods
all the below methods return the `Toasted Object` of the toast.
```javascript
Vue.toasted.success( {string | html } message, {object} options)

// available methods
Vue.toasted.show(message, options)
Vue.toasted.success(message, options)
Vue.toasted.info(message, options)
Vue.toasted.error(message, options)
```


### Toast Object
check the examples to see how to manipulate the object.
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


### Actions
<p align="center">
    <a href="https://github.com/shakee93/vue-toasted" target="_blank">
    <img width="300" src="https://shakee93.github.io/vue-toasted/assets/images/action-preview.jpg">
    </a>
</p> 
<p>:zap: You can have single or multiple actions in the toast. take a look at the example below</p>

```javascript
{
    // you can pass a single action as below
    action : {
        text : 'Cancel',
        onClick : (e, toastObject) => {
            toast.goAway(0);
        }
    },

    // you can pass a multiple actions as an array of actions
    action : [
        {
            text : 'Cancel',
            onClick : (e, toastObject) => {
                toast.goAway(0);
            }
        },
        {
            text : 'Undo',
            onClick : (e, toastObject) => {
                this.$router.push({ name : 'somewhere' })
            }
        }
    ]
}
```


### Icons
:sunny: Now <a href="http://google.github.io/material-design-icons/"> Material Icons</a> are supported. you will have to import the material icons into your project. <a href="/examples/using-icons.js"> example </a>

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

### options

below are the available options

**Option**|**Type's**|**Default**|**Description**
-----|-----|-----|-----
position|String|'top-right'|Position of the toast container <br> **['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left']**
duration|Number|null|Display time of the toast in millisecond
action|Object, Array|null|Add single or multiple actions to toast  <br> `{ text : String, icon : String, onClick : Function(event, toastObject) } `
fullWidth|Boolean|false|Enable Full Width
fitToScreen|Boolean|false|Fits to Screen on Full Width
className|String, Array|null|Custom css class name of the toast
containerClass|String, Array|null|Custom css classes for toast container
Icon|String, Object|null|Material icon name as string.  <br> `{ name : String , after : Boolean } `
type|String|'default'| Type of the Toast  **['success', 'info', 'error']**
theme|String|'primary'|Theme of the toast you prefer<br> **['primary', 'outline', 'bubble']**
onComplete|Function|null|Trigger when toast is completed

### Custom Toast Registration

You can register your own toasts like below and it will be available all over the application.

Api of Toast Registration 

**Option**|**Type's**|**Default**|**Description**
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

### Credits

+ Whoever contributes to this project :wink:
+ Inspired and developed from [materialize-css](https://github.com/Dogfalo/materialize) toast.


Enjoy Toasting !!