<template>
<div class="list-view">
  <div class="list-view-navbar-fixed">
    <slot name="navbar"></slot>
  </div>
  <mu-refresh-control 
  :refreshing="refreshing" 
  :trigger="el"
  @refresh="triggerRefresh" />
  <slot name="empty"></slot>
  <div class="list-view-inner">
    <slot name="list"></slot>
  </div>
  
  <mu-infinite-scroll
  v-if="canLoadMore"
  :scroller="el"
  loadingText="正在加载" 
  :loading="loading" 
  @load="triggerLoad" />
  <div v-if="!canLoadMore" class="no-more">
    没有更多数据了: )
  </div>
</div>
</template>

<style lang="stylus" scoped>
.list-view
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  padding-bottom: 56px;
  background-color: #fff;
  .list-view-navbar-fixed
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 300;
  .list-view-inner
    width: 100%;
    margin-top: 56px;
    -webkit-overflow-scrolling: touch;
  .no-more
    width: 100%;
    height: 50px;
    text-align: center;
    color: #bdbdbd;


</style>

<script>
  import axios from 'axios';
  import bus from '@/scripts/bus.js';
  import store from 'store';

  export default {
    props: ['isServer', 'loadConfig', 'refreshConfig', 'canLoadMore'],
    data() {
      return {
        el: null,
        loading: false,
        refreshing: false,
      };
    },
    beforeCreate() {
      this.$emit('startload');
    },
    mounted() {
      this.el = this.$el;
      const match = /^\?openid=(.*)$/g.exec(window.location.search);
      if (match && match[1] && !store.get('key')) {
        axios.get(`/wx/login/${match[1]}`)
        .then((response) => {
          const data = response.data.data;
          store.set('key', data.token);
          store.set('status', true); // 刷新令牌
          this.triggerRefresh();
          this.$emit('loaded');
        })
        .catch((err) => {
          alert(err);
          bus.$emit('alert', '请检查网络连接');
        });
      } else {
        this.triggerRefresh();
        this.$emit('loaded');
      }
    },
    methods: {
      triggerLoad() {
        this.loading = true;
        if (this.isServer) {
          axios
          .post(this.loadConfig.url, this.loadConfig.data)
          .then((response) => {
            this.$emit('triggerLoad', response.data);
            this.loading = false;
          })
          .catch(() => {
            bus.$emit('alert', '网络出错!');
            this.loading = false;
          });
        } else {
          this.$emit('triggerLoad');
          this.loading = false;
        }
      },
      triggerRefresh() {
        this.refreshing = true;
        if (this.isServer) {
          axios
          .post(this.refreshConfig.url, this.refreshConfig.data)
          .then((response) => {
            this.$emit('triggerRefresh', response.data);
            this.refreshing = false;
          })
          .catch(() => {
            bus.$emit('alert', '网络出错!');
            this.refreshing = false;
          });
        } else {
          this.$emit('triggerRefresh');
          this.refreshing = false;
        }
      },
    },
  };
</script>

