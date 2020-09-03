import { createApp } from 'vue';

import App from './App.vue';

import VueToasted from '../../src/index';

export const app = createApp(App);

app
  .use(VueToasted)
  .mount('#app');
