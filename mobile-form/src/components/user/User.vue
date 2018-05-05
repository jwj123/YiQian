<template>
  <page-view>
    <mu-appbar slot="navbar"
    title="个人中心" >
    </mu-appbar>
    <mu-list slot="content">
      <mu-flexbox class="user-avatar" orient="vertical" justify="center">
        <mu-avatar v-if="avatar" 
        class="user-avatar-inner" 
        :src="avatar"
        backgroundColor="blueGrey400" 
        :size="100"></mu-avatar>
        <mu-avatar v-else
        class="user-avatar-inner" 
        :icon="'\ue3f4'"
        :iconSize="70"
        backgroundColor="blueGrey400" 
        :size="100"></mu-avatar>
      </mu-flexbox>
      <template v-for="(item, index) in items">
        <mu-list-item
        v-if="index === 2"
        :title="item.title"
        :key="index"
        @click="logout">
          <mu-icon slot="left" :value="item.icon"></mu-icon>
        </mu-list-item>
        <mu-list-item
        v-else
        :title="item.title"
        :key="index"
        :to="item.to!==undefined ? item.to : ''">
          <mu-icon slot="left" :value="item.icon"></mu-icon>
        </mu-list-item>
        <mu-divider />
      </template>
    </mu-list>
  </page-view>
</template>

<style lang="stylus" scoped>
.user-avatar
  height: 180px;
  position: relative;
  top: -9px;
  background: url(../../assets/images/person_bg.jpg) no-repeat;
  background-size: 100% 120%;
  .user-avatar-inner
    font-size: 40px;

</style>

<script>
  import axios from 'axios';
  import store from 'store';
  import router from '@/router';

  export default {
    mounted() {
      axios.get('/user/avatar')
      .then((response) => {
        const result = response.data;
        this.avatar = result.data;
      });
    },
    methods: {
      logout() {
        store.remove('key');
        router.push('/login');
      },
    },
    data() {
      return {
        avatar: '',
        items: [{
          icon: '\ue851',
          title: '个人信息',
          to: '/user/info',
        }, {
          icon: '\ue887',
          title: '帮助文档',
        }, {
          icon: '\ue86a',
          title: '退出登陆',
        }, {
          icon: '\ue87f',
          title: '意见反馈',
        }],
      };
    },
  };
</script>
