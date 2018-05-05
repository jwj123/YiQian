<template>
  <page-view :navbar="navConfig">
    <mu-flexbox slot="content" class="new-form" orient="vertical" justify="center">
      <!--输入框组件 问卷标题-->
      <mu-text-field class="new-form-item"
        v-model="title" 
        :errorText="validateTitle()" 
        label="问卷标题" 
        labelFloat />
      <!--输入框组件 问卷介绍-->
      <mu-text-field class="new-form-item" multiLine
        v-model="intro"
        :errorText="validateIntro()" 
        :rows="2" 
        :rowsMax="6" 
        label="介绍词(用以介绍问卷的内容)" 
        labelFloat />
      <!--按钮组件 创建按钮-->
      <mu-raised-button 
      class="new-form-item" fullWidth 
      label="创建问卷"
      primary
      @click="createForm" 
      :disabled="notValidate()" />
    </mu-flexbox>
  </page-view>
</template>

<style lang="stylus" scoped>
  .new-form
    width: 100%;
    padding: 5px 40px;
    .new-form-item
      margin-top: 20px;

</style>

<script>
  import axios from 'axios';
  import bus from '@/scripts/bus';
  import router from '@/router';

  export default {
    data() {
      return {
        navConfig: {
          title: '创建问卷',
        },
        title: '',
        intro: '',
        notSubmit: true,
      };
    },
    computed: {
    },
    methods: {
      notValidate() {
        if (!this.validateTitle()
        && !this.validateIntro()
        && this.notSubmit) {
          return false;
        }
        return true;
      },
      validateTitle() {
        if (this.title && this.title.length <= 60) {
          return '';
        }
        return '不能为空且标题长度不能多于60个字';
      },
      validateIntro() {
        if (this.intro) {
          return '';
        }
        return '介绍词不能为空';
      },
      // 创建问卷方法
      createForm() {
        if (this.notValidate()) return;
        this.notSubmit = false;
        axios
        .post('/form/create', {
          title: this.title,
          intro: this.intro,
        })
        .then((response) => {
          const res = response.data;
          if (res.message !== 'ok') {
            this.notSubmit = true;
            bus.$emit('alert', res.message);
            return;
          }
          router.push({ path: `/form/edit/${res.data.id}` });
        })
        .catch((err) => {
          this.notSubmit = true;
          bus.$emit('alert', err);
        });
      },
    },
  };
</script>

