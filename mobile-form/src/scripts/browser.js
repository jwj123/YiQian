function addEvent(ele, evType, handler, useCapture) {
  const events = evType.split(' ');
  if (ele.addEventListener) {
    for (let i = 0; i < events.length; i += 1) {
      ele.addEventListener(events[i], handler, useCapture);
    }
  } else if (ele.attachEvent) {
    for (let i = 0; i < events.length; i += 1) {
      ele.attachEvent(`on${events[i]}`, handler);
    }
  }
  for (let i = 0; i < events.length; i += 1) {
    ele[`on${events[i]}`] = handler;
  }
}

const vendors = ['webkit', 'Moz', 'ms', 'O'];
const cssVendors = ['-webkit-', '-moz-', '-ms-', '-o-'];

function css(el, prop, value) {
  value = value.replace(/^\s+|\s+$/g, '');
  el.style[prop] = value;
  const p = prop[0].toUpperCase() + prop.substring(1);
  for (let i = 0; i < vendors.length; i += 1) {
    const styleProp = `${vendors[i]}${p}`;
    if (el.style[styleProp]) {
      if (prop === 'transition') {
        value = cssVendors[i] + value;
      }
      el.style[styleProp] = value;
    }
  }
}

export { addEvent, css };

