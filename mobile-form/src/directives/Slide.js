import { addEvent } from '@/scripts/browser.js';
import Vue from 'vue';

const Slide = {};
Slide.install = function install() {
  function getCurrentPosition(e, prop) {
    return e.touches === undefined ? e[prop] : e.touches[0][prop];
  }

  function eventDid(modi, e) {
    if (modi.prevent) {
      e.preventDefault();
    }
    if (modi.stop) {
      e.stopPropagation();
    }
  }

  Vue.directive('slide', {
    bind(el, binding) {
      const handler = binding.value;
      const modi = binding.modifiers;
      if (!el.slideEvent) el.slideEvent = {};
      const slideEvent = el.slideEvent;
      if (handler && handler.enable) {
        addEvent(el, 'touchstart mousedown', (e) => {
          // eventDid(modi, e);
          slideEvent.startX = getCurrentPosition(e, 'clientX');
          slideEvent.startY = getCurrentPosition(e, 'clientY');
          slideEvent.oldX = slideEvent.startX;
          slideEvent.currentX = slideEvent.startX;
          slideEvent.target = el;
          slideEvent.isMove = true;
          handler.start(slideEvent, e);
        });
        addEvent(el, 'touchmove mousemove', (e) => {
          const w = Math.abs(slideEvent.startX - getCurrentPosition(e, 'clientX'));
          const h = Math.abs(slideEvent.startY - getCurrentPosition(e, 'clientY'));
          if (w > h) {
            e.preventDefault();
          }
          // eventDid(modi, e);
          if (slideEvent.isMove) {
            slideEvent.oldX = slideEvent.currentX;
            slideEvent.currentX = getCurrentPosition(e, 'clientX');
            handler.move(slideEvent, e);
          }
        });
        addEvent(el, 'touchend mouseup', (e) => {
          // eventDid(modi, e);
          if (slideEvent.isMove) {
            slideEvent.isMove = false;
            handler.end(slideEvent, e);
          }
        });
      }
    },
  });
};

export default Slide;

