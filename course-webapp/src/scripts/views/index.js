var tplIndex = require('../tpl/index.string');
var fnUtil = require('../util/fn.util.js');

var _ = SPA.util;

SPA.defineView('index', {
  html: tplIndex,

  plugins: ['delegated'],

  init: {

  },

  modules: [{
    name: 'indexContent',
    container: '.l-index-content',
    views: ['home', 'search', 'my'],
    defaultTag: 'home'
  }],

  bindActions: {
    'tap.home': function(e, data) {
      this.modules.indexContent.launch('home');
      fnUtil.setActive(e.el);
    },
    'tap.search': function (e, data) {
      this.modules.indexContent.launch('search');
      fnUtil.setActive(e.el);
    },
    'tap.my': function (e, data) {
      fnUtil.setActive(e.el);
      if(_.storage('isLogin')){
        this.modules.indexContent.launch('my');

      } else {
        $('body > div').hide();
        SPA.show('login', {
          ani: {
            name: 'dialog',
            width: 280,
            height: 200,
            autoHide: true
          },
          param: {
            view: this
          }
        });
      }
    },
    'tap.exit': function(e, data) {
      fnUtil.setActive(e.el);
      _.storage('isLogin', null);
      // _.storage.clear(); 清楚所有数据
      this.hide();
    }
  },

  bindEvents: {
    'beforeShow': function() {

    }
  }
});
