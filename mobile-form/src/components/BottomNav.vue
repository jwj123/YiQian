<template>
  <mu-bottom-nav v-if="isRender" class="bottom-nav-fixed" :value="bottomNav">
    <mu-bottom-nav-item v-for="(item, index) in items"
    :value="item.url" :title="item.label"
    :icon="item.icon" :key="index"
    :to="item.url" />
  </mu-bottom-nav>
</template>

<style lang="stylus">
.bottom-nav-fixed
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  ~.page-view
    padding-bottom: 56px;

</style>

<script>
  
  export default {
    data() {
      return {
        isRender: this.checkShow(),
        bottomNav: this.$route.path,
        items: [
          { label: '问卷', icon: '\ue241', url: '/' },
          { label: '我的', icon: '\ue7fd', url: '/user' },
        ],
      };
    },
    methods: {
      checkShow() {
        const path = this.$route.path;
        if (path !== '/' && path !== '/user' && path !== '/form') {
          return false;
        }
        return true;
      },
    },
    watch: {
      $route(to) {
        const path = to.fullPath;
        if (path !== '/' && path !== '/user' && path !== '/form') {
          this.isRender = false;
        } else {
          this.isRender = true;
          this.bottomNav = path;
        }
      },
    },
  };
</script>
