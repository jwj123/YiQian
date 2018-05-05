<template>
  <div v-slide="{ start: slideStart, move: slideMove, end: slideEnd, enable: enable }">
    <slot></slot>
  </div>
</template>

<script>
  import { css } from '@/scripts/browser.js';

  export default {
    props: {
      slideDistance: Number,
      enable: Boolean,
    },
    data() {
      return {
        ele: null,
        currentX: 0,
      };
    },
    mounted() {
      this.ele = this.$el;
    },
    methods: {
      translateX(currentX) {
        return `translateX(${currentX}px)`;
      },
      open() {
        css(this.ele, 'transform', this.translateX(-this.slideDistance));
      },
      close() {
        css(this.ele, 'transform', this.translateX(0));
      },
      slideStart() {
        this.currentX = 0;
        css(this.ele, 'transition', '  transform 300ms ');
        css(this.ele, 'transform', this.translateX(0));
      },
      slideMove(evt) {
        const nowX = this.currentX + (evt.currentX - evt.oldX);
        if (nowX < 0 && Math.abs(nowX) <= this.slideDistance) {
          // e.preventDefault();
          // e.stopPropagation();
          css(this.ele, 'transform', this.translateX(nowX));
          this.currentX = nowX;
        }
      },
      slideEnd(evt) {
        const distance = evt.currentX - evt.startX;
        if (distance > -this.slideDistance) this.close();
        else this.open();
      },
    },
  };
</script>
