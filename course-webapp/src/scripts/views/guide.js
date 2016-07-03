require('../lib/swiper-3.3.1.min.js');
var tplGuide = require('../tpl/guide.string');

SPA.defineView('guide', {
  html: tplGuide,
  plugins: ['delegated'],
  bindActions: {
    'goto.index': function () {
      SPA.open('index');
    }
  },
  bindEvents: {
    'beforeShow': function() {
      var mySwiper = new Swiper('#guide-swiper', {
        loop: false
      });
    }
  }
});
