<template>
<page-view :navbar="navConfig">
  <mu-flat-button 
  slot="rightButton" 
  v-if="form&&(form.status===0||form.status===2)" 
  label="发布" 
  @click="public(id)" />
  <mu-flat-button 
  slot="rightButton"
  @click="view(id)" 
  v-if="form&&(form.status===1)"
  label="查看" />
  <div class="questionare" slot="content">
    <mu-paper class="questionare-inner" :zDepth="1">
      <dynamic-form :form="form">
      </dynamic-form>
      <mu-raised-button label="提交" fullWidth primary />
    </mu-paper>
   </div>
</page-view>
</template>

<style lang="stylus" scoped>
  .questionare
    width: 100%;
    padding: 10px;
    &-inner
      width: 100%;
      padding: 20px 8px;

</style>

<script>
  import DynamicForm from '@/components/common/DynamicForm.vue';
  import axios from 'axios';
  import bus from '@/scripts/bus';

  export default {
    components: { DynamicForm },
    data() {
      return {
        form: null,
        id: this.$route.params.id,
        navConfig: {
          title: '预览',
        },
        items: [],
      };
    },
    methods: {
      view(id) {
        window.location.href = `/${id}`;
      },
      public(id) {
        axios.post(`/form/public/${id}`)
        .then((response) => {
          const msg = response.data.message;
          if (msg === 'ok') window.location.href = `/${id}`;
        })
        .catch((err) => {
          console.log(err);
        });
      },
    },
    mounted() {
      axios.get(`/form/get/${this.id}`)
      .then((response) => {
        const data = response.data.data;
        this.form = data;
      })
      .catch((err) => {
        bus.$emit('alert', err.message);
      });
    },
  };
</script>
