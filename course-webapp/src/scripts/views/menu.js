var tplMenu = require('../tpl/menu.string');

SPA.defineView('menu', {
  html: tplMenu,
  styles: {
    background: '#125224 !important'
  },
  plugins: ['delegated'],
  bindActions: {
    'goto.home': function (e, data) {
      this.hide();
      $('.popup-mask').remove();
      SPA.open('index');
      SPA.getView('index', function (view) {
        view.modules.indexContent.launch('home');
        var $footer = $(view.root).find('.l-footer li');
        $footer.eq(0).addClass('active').siblings().removeClass('active');
      });
      SPA.getView('home')
    }
  },
  bindEvents: {
    'beforeShow': function() {
      var self = this;
      var el = document.body;
      var $mask = $('<div class="popup-mask"></div>');
      $(el).append($mask);
      $mask.css('z-index', $(self.root).css('z-index')-1);
      $mask.on('tap', function(){
        self.hide();
        $('body > div').show();
        $mask.remove();
      });
    }
  }
});
