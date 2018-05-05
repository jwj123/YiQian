<template>
  <div id="app">
    <mu-popup position="top" popupClass="alertClass" :overlay="false" :open="popup">
      {{ message }}
    </mu-popup>
    <mu-linear-progress v-show="isLoading" class="loading" />
    <bottom-nav></bottom-nav>
    <transition
    :name="transition"
    mode="in-out">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style lang="stylus">
#app
  position: absolute;
  width: 100%;
  height: 100%;
.alertClass
  width: 60%;
  opacity: .8;
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
  border-radius: 3px;
.loading
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100000;
.view
  transition: transform .3s ease-in-out;
.slide-left-enter, .slide-right-leave-active
  opacity: 0;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
.slide-left-leave-active, .slide-right-enter
  opacity: 0;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);

</style>

<script>
  import bus from './scripts/bus.js';
  // BottomNav -> bottom-nav
  import BottomNav from './components/BottomNav.vue';

  export default {
    data() {
      return {
        popup: false,
        message: '',
        transition: 'slide-left',
        isLoading: false,
      };
    },
    created() {
      bus.$on('loaded', () => {
        this.isLoading = false;
      });
      bus.$on('startload', () => {
        this.isLoading = true;
      });
      bus.$on('alert', (msg) => {
        this.alert(msg);
      });
    },
    methods: {
      alert(msg) {
        this.popup = true;
        this.message = msg;
        setTimeout(() => {
          this.popup = false;
          this.message = '';
        }, 1500);
      },
    },
    watch: {
      $route(to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        if (toDepth > fromDepth) {
          this.transition = 'slide-left';
        } else if (toDepth === fromDepth) {
          this.transition = '';
        } else {
          this.transition = 'slide-right';
        }
      },
    },
    components: { BottomNav }, // 局部可用
  };
</script>
