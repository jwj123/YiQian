<template>
  <transition-group name="list" tag="div" class="list-wrapper">
    <slot></slot>
  </transition-group>
</template>
<style lang="stylus">
.list-wrapper
  position: relative;
.list-enter-active, .list-leave-active
  transition: all .3s ease;
.list-enter
  opacity: 0;
  transform: translate3d(0, -20px, 0);
.list-leave-active
  transform: translate3d(-100%, 0, 0);
  position: absolute;
  opacity: 0;
.list-move
  transition: all 500ms;

</style>
