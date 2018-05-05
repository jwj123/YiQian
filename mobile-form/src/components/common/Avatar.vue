<template>
    <mu-avatar v-if="src"
    :src="src"
    backgroundColor="blueGrey400" >
    </mu-avatar>
    <mu-avatar v-else
    :icon="'\ue3f4'"
    backgroundColor="blueGrey400">
    </mu-avatar>
</template>

<script>
  export default {
    props: ['src'],
  };
</script>
