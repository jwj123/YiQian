<template>
  <mu-flexbox orient="vertical">
    <mu-text-field
    label="题目标题"
    hintText="请输入题目名称"
    fullWidth
    v-model="target.label">
    </mu-text-field>
    <mu-text-field
    label="题目提示文字"
    hintText="输入题目的提示"
    fullWidth
    v-model="target.hintText">
    </mu-text-field>
  </mu-flexbox>
</template>

<script>
  export default {
    props: ['target'],
  };
</script>
