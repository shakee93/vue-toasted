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
        onClick : (e) => {
            toast.goAway(0);
        }
    },

    // you can pass a multiple actions as an array of actions
    action : [
        {
            text : 'Cancel',
            onClick : (e) => {
                toast.goAway(0);
            }
        },
        {
            text : 'Undo',
            onClick : (e) => {
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
className|String, Array|null|Custom css class name of the toast
containerClass|String, Array|null|Custom css classes for toast container
Icon|String, Object|null|Material icon name as string.  <br> `{ name : String , after : Boolean } `
theme|String|'primary'|Theme of the toast you prefer<br> **['primary', 'outline', 'bubble']**
onComplete|Function|null|Trigger when toast is completed

### Reusable Global Toasts

you can register your global toasts under `globalToasts`. they will be available globally for use in `$toasted.global`. 
take a look at the detailed example  <a href="/examples/reusable-toast.js"> here </a>

```javascript
// Global Plugin Register
Vue.use(Toasted, {
  globalToasts : {

    myGlobalToast : function(payload, initiate){
        
        // your logic using payload here...
        
        // initiate(Message/html, option/string)
        // error/show/success/info or an option object
        return initiate("My Deepest Condolence", 'error');
    },
    // my another toast...
  }
});
```

viola !! now you can use your toast in anywhere


```javascript
// send your payload to global toast
$toasted.global.myGlobalToast(payload);
```

### Credits

+ Whoever contributes to this project :wink:
+ Inspired and developed from [materialize-css](https://github.com/Dogfalo/materialize) toast.


Enjoy Toasting !!