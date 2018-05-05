<template>
  <page-view :navbar="navConfig">
    <mu-flexbox class="register" slot="content" orient="vertical">
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
        <mu-text-field 
        hintText="密码确认" 
        v-model="rePassword" 
        type="password" 
        :errorText="validateRepassword()"
        fullWidth>
        </mu-text-field>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-raised-button 
        fullWidth 
        label="注册"
        :disabled="notValidate()"
        @click="register"
        primary/>
      </mu-flexbox-item>
    </mu-flexbox>
  </page-view>
</template>

<style lang="stylus" scoped>
  .register
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
        rePassword: '',
        isSubmit: false,
        navConfig: {
          title: '注册',
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
      validateRepassword() {
        if (!this.rePassword) return '确认密码不能为空';
        if (this.rePassword !== this.password) return '密码不一致';
        return '';
      },
      notValidate() {
        if (!this.validateEmail()
        && !this.validatePassword()
        && !this.validateRepassword()
        && !this.isSubmit) return false;
        return true;
      },
      register() {
        if (!this.notValidate()) {
          this.isSubmit = true;
          axios.post('/register', {
            username: this.username,
            password: this.password,
          }).then((response) => {
            const data = response.data.data;
            store.set('key', data.token);
            store.set('status', true); // 刷新令牌
            this.isSubmit = false;
            router.push({ path: '/form' });
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

