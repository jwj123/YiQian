<template>
  <page-view :navbar="navConfig">
    <mu-flexbox class="login" slot="content" orient="vertical">
      <mu-flexbox-item>
        <mu-text-field 
        hintText="邮箱" 
        v-model="username"
        :errorText="validateEmail()" 
        fullWidth>
        </mu-text-field>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-text-field 
        hintText="密码" 
        v-model="password" 
        type="password" 
        :errorText="validatePassword()"
        fullWidth>
        </mu-text-field>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-raised-button 
        fullWidth 
        label="登录"
        :disabled="notValidate()"
        @click="login"
        primary/>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-flexbox justify="flex-end">
          <mu-flat-button label="注册" to="/register" primary />
        </mu-flexbox>
      </mu-flexbox-item>
    </mu-flexbox>
  </page-view>
</template>

<style lang="stylus" scoped>
  .login
    padding: 20px 14%;

</style>

<script>
  import Validate from '@/scripts/validate';
  import axios from 'axios';
  import store from 'store';
  import bus from '@/scripts/bus';
  import router from '@/router';

  export default {
    data() {
      return {
        username: '',
        password: '',
        isSubmit: false,
        navConfig: {
          title: '登录',
        },
      };
    },
    methods: {
      validateEmail() {
        if (!this.username) return '邮箱不能为空';
        if (!Validate.validateEmail(this.username)) {
          return '邮箱格式错误';
        }
        return '';
      },
      validatePassword() {
        if (!this.password) return '密码不能为空';
        if (!/^[\w\d]{8,20}$/.test(this.password)) return '必须为8到20位的字母,数字,_';
        return '';
      },
      notValidate() {
        if (!this.validateEmail()
        && !this.validatePassword()
        && !this.isSubmit) return false;
        return true;
      },
      login() {
        if (!this.notValidate()) {
          this.isSubmit = true;
          axios.post('/login', {
            username: this.username,
            password: this.password,
          }).then((response) => {
            const data = response.data.data;
            store.set('key', data.token);
            store.set('status', true); // 刷新令牌
            this.isSubmit = false;
            router.push({ path: '/' });
          }).catch((err) => {
            this.isSubmit = false;
            if (err.message === 'Network Error') {
              bus.$emit('alert', '请检查网络连接');
            }
          });
        }
      },
    },
  };
</script>
