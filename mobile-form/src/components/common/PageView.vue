<template>
<div class="page-view">
  <div class="page-view-navbar-fixed">
    <template>
      <mu-appbar v-if="nav !== null" :title="nav.title">
        <mu-icon-button 
        @click="back" 
        v-if="hasBack()" 
        :icon="icons.arrow_left" 
        slot="left" />
        <mu-flat-button 
        v-if="nav.rightText" 
        color="white" 
        :label="nav.rightText" 
        :to="nav.rightTo"
        slot="right" />
        <div slot="right">
          <slot name="rightButton"></slot>
        </div>
      </mu-appbar>
    </template>
    <slot name="navbar"></slot>
  </div>
  <div class="page-view-inner">
    <slot name="content"></slot>
  </div>
</div>
</template>

<style lang="stylus" scoped>
.page-view
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  background-color: #fff;
  .page-view-navbar-fixed
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    ~.page-view-inner
      margin-top: 56px;
  .page-view-inner
    width: 100%;
    -webkit-overflow-scrolling: touch;

</style>


<script>
  import router from '@/router';
  import bus from '@/scripts/bus.js';

  export default {
    props: ['navbar'],
    data() {
      return {
        nav: this.navbar || null,
        icons: {
          arrow_left: '\ue5c4',
        },
      };
    },
    beforeCreate() {
      bus.$emit('startload');
    },
    mounted() {
      bus.$emit('loaded');
    },
    methods: {
      back() {
        router.go(-1);
      },
      hasBack() {
        return window.history.length > 1;
      },
    },
  };
</script>
