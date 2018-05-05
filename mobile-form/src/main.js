import Vue from 'vue';
import App from './App.vue';
import router from './router';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css'; // 加载museUI的基础样式
import 'muse-ui/dist/theme-light.css';
import './styles/material-design-icons.css'; // 加载material design icons
import './styles/style.styl';
import ListView from './components/common/ListView.vue';
import PageView from './components/common/PageView.vue';
import Slide from './directives/Slide';
import Interceptors from './scripts/inteceptors';

Vue.use(MuseUI);
Vue.use(Slide);
Vue.use(Interceptors);
Vue.component('list-view', ListView);
Vue.component('page-view', PageView);

new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App },
});
