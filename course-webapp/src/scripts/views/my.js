var tplMy = require('../tpl/my.string');
var fnUtil = require('../util/fn.util.js');

SPA.defineView('my', {
  html: tplMy,
  plugins: ['delegated'],
  styles: {
    'background': '#eceef0 !important'
  },
  bindActions: {
    'tap.menu': function () {
      fnUtil.showSidebar();
    }
  },
  bindEvents: {
    'beforeShow': function() {

    }
  }
});
