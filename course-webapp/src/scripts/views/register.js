var tplRegister = require('../tpl/register.string');

SPA.defineView('register', {
  html: tplRegister,
  styles: {
    'background': '#fff !important'
  },
  plugins: ['delegated'],
  bindActions: {
    'tap.cancel': function () {
      this.hide();
    }
  },
  bindEvents: {
    'beforeShow': function() {

    }
  }
});
