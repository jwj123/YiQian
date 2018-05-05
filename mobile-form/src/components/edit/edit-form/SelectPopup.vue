<template>
  <mu-dialog
  title="选择表单项"
  :open="config.open" 
  @close="close"
  scrollable>
  <mu-flexbox justify="center" wrap="wrap">
    <mu-flat-button 
    class="select-item text-overflow" 
    v-for="(item, index) in selectItems"
    :key="index"
    :icon="item.icon"
    @click="addItem(item.type)" 
    :backgroundColor="item.backgroundColor" 
    :color="item.color" 
    :label="item.text"></mu-flat-button>
  </mu-flexbox>
  <mu-flat-button 
  primary
  label="关闭" 
  @click="close" 
  slot="actions"/>
  </mu-dialog >
</template>

<style lang="stylus">
.select-item
  width: 45%;
  margin-top: 15px;
  &:nth-child(even)
    margin-left: 2%;

</style>

<script>
  export default {
    props: ['config'],
    methods: {
      close() {
        this.operatePopup(false);
      },
      operatePopup(status) {
        this.config.open = status;
      },
      addItem(type) {
        this.close();
        this.$emit('add', type);
      },
    },
    data() {
      return {
        selectItems: [{
          icon: '\ue837',
          text: '单选题',
          backgroundColor: '#2196f3',
          color: '#fff',
          type: 'select-one',
        },
        {
          icon: '\ue834',
          text: '多选题',
          backgroundColor: '#2196f3',
          color: '#fff',
          type: 'select-multi',
        },
        {
          icon: '\ue262',
          text: '单行输入',
          backgroundColor: '#2196f3',
          color: '#fff',
          type: 'text-one',
        },
        {
          icon: '\ue235',
          text: '多行输入',
          backgroundColor: '#2196f3',
          color: '#fff',
          type: 'text-multi',
        }],
      };
    },
  };
</script>
