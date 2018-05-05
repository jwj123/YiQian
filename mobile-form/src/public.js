import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-light.css';
import './styles/material-design-icons.css';
import PageView from './components/common/PageView.vue';
import Slide from './directives/Slide';
import Public from '@/components/public/Public.vue';

Vue.use(MuseUI);
Vue.use(Slide);
Vue.component('page-view', PageView);

new Vue({
  el: '#form',
  template: '<Public />',
  components: { Public },
});
