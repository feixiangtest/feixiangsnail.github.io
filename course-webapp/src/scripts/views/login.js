var tplLogin = require('../tpl/login.string');

var _ = SPA.util;

SPA.defineView('login', {
  html: tplLogin,
  styles: {
    'background-color': 'transparent',
    'border-radius': '.2rem'
  },
  plugins: ['delegated'],
  bindActions: {
    'tap.close': function () {
      this.hide();
    },
    'tap.register': function () {
      SPA.show('register', {
        ani: {
          name: 'actionSheet',
          distance: 200
        }
      });
    },
    'tap.submit': function () {
      this.param.view.modules.indexContent.launch('my');
      _.storage('isLogin', true);
      this.hide();
    }
  },
  bindEvents: {
    'beforeShow': function() {

    }
  }
});
