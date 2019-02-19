import Vue from 'vue';
import Framework7 from 'framework7/framework7.esm.bundle.js';
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';
import Framework7Styles from 'framework7/css/framework7.css';
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';
import App from './app.vue';

Framework7.use(Framework7Vue)

new Vue({
  el: '#app',
  template: '<app/>',
  components: {
    app: App
  }
});