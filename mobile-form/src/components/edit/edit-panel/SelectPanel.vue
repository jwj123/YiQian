<template>
  <mu-flexbox orient="vertical">
    <mu-text-field
    label="题目标题"
    hintText="请输入题目名称"
    fullWidth
    v-model="target.label">
    </mu-text-field>
    <div class="option" 
      v-for="(item, index) in target.items"
      :key="item">
      <div class="option-del material-icons" @click="deleteItem(index)">&#xe5cd;</div>
      <mu-text-field 
      fullWidth
      :label="'选项'+(index+1)"
      hintText="输入选项名称"
      v-model="item.label">
      </mu-text-field>
    </div>
    

    <mu-flexbox justify="center">
      <mu-float-button 
      :icon="'\ue145'"
      mini
      primary 
      @click="addItem()" />
    </mu-flexbox>

  </mu-flexbox>
</template>

<style lang="stylus" scoped>
  .option
    position: relative;
    width: 100%;
    &-del
      width: 30px;
      height: 30px;
      font-size: 16px;
      text-align: center;
      line-height: 30px;
      position: absolute;
      top: 0;
      z-index: 1000;
      right: 0;

</style>

<script>
  export default {
    props: ['target'],
    data() {
      return {

      };
    },
    methods: {
      deleteItem(index) {
        this.target.items.splice(index, 1);
      },
      addItem() {
        this.target.items.push({
          label: '',
        });
      },
    },
  };
</script>
