require('../lib/swiper-3.3.1.min.js');
var tplHome = require('../tpl/home.string');
var fnUtil = require('../util/fn.util.js');
var waterfallUtil = require('../util/waterfall.util.js');

SPA.defineView('home', {
  html: tplHome,

  plugins: ['delegated', {
    name: 'avalon',
    options: function(vm) {
      vm.livelist = [];
      vm.plainLivelist = [];
      vm.beautylist = [];
      vm.zan = [100, 200, 300, 400];
      vm.showLoading = true;
    }
  }],

  init: {
    homeSwiper: null,
    homehotSwiper: null,
    vm: null
  },

  bindActions: {
    'switch.homehot': function(e, data) {
      var $el = $(e.el);
      this.homehotSwiper.slideTo($el.index());
      $el.addClass('active').siblings().removeClass('active');
    },

    'switch.home': function(e, data) {
      var self = this;
      var $el = $(e.el);
      this.homeSwiper.slideTo($(e.el).index());
      $el.addClass('active').siblings().removeClass('active');

      // 显示loading
      self.vm.showLoading = true;
      setTimeout(function () {
        self.vm.showLoading = false;

        // home focus 菜单停靠
        var hfScroll = self.widgets.homeFocus;
        var $dm = $('.home-focus #dockMenu');
        var dmOffset = $dm.offset().top; // 相对body的top
        hfScroll.on('scroll', function() {
          var y = this.y;
          if (44 - y >= dmOffset) { // 滚动到停靠菜单处
            if($('body > div > #dockMenu').length <= 0) $dm.clone(true).appendTo('body').wrap('<div>');
          } else {
            $('body > div').remove();
          }
        });
      }, 2000);
    },

    'tap.dianzan': function (e, data) {
      var i = parseInt(data.index, 10);
      var newNum = this.vm.zan[i]+1;
      this.vm.zan.set(i, newNum);
    },

    'tap.menu': function () {
      fnUtil.showSidebar();
      $('body > div').hide();
    },

    // 扫描二维码
    'scan': function () {

    }
  },

  bindEvents: {
    'beforeShow': function() {
      // 保存视图对象
      var self = this;

      // 在视图里创建vm对象
      self.vm = self.getVM();

      // swiper
      self.homehotSwiper = new Swiper('#home-hot-swiper', {
        loop: false,
        onTransitionStart: function() {
          $('#home-hot-nav li').eq(self.homehotSwiper.activeIndex)
            .addClass('active').siblings().removeClass('active');
        }
      });
      self.homeSwiper = new Swiper('#home-swiper', {
        loop: false
      });

      // 上拉下拉
      var liveScroll = new IScroll('#liveScroll', {
        probeType: 3,
        mouseWheel: true
      });
      fnUtil.pullToRefresh({
        objScroll: liveScroll,
        ptrHeight: 35,
        loaderImg: '/course-webapp/images/ajax-loader.gif',
        arrowImg: '/course-webapp/images/arrow.png',
        head: $('.head img'),
        foot: $('.foot img'),
        view: self
      });

      // 第一次从后端拉取数据
      $.ajax({
        url: '/course-webapp/mock/livelist.json',
        success: function(res) {
          if (res.ret) {
            self.vm.livelist = fnUtil.dataFormat(res.data);
            self.vm.plainLivelist = res.data;
            setTimeout(function(){
              avalon.scan(self.root, self.vm);
              liveScroll.refresh();
            },0);
          } else {
            console.log('数据有误，请稍后重试。');
          }
        },
        error: function() {
          console.log('服务器发生错误，请稍后重试。')
        }
      });

      // waterfall 瀑布流
      var lifeScroll = new IScroll('#lifescroll', {
        probeType: 3,
        mouseWheel: true
      });
      waterfallUtil(lifeScroll);

      // css3waterfall 数据拉取
      $.ajax({
        url: '/course-webapp/mock/zuqiuZhuangbei.json',
        success: function(res) {
          if (res.ret) {
            self.vm.beautylist = res.data;
          } else {
            console.log('数据有误，请稍后重试。');
          }
        },
        error: function() {
          console.log('服务器发生错误，请稍后重试。')
        }
      });
    },
    'beforeHide': function() {
      $('body > div').remove();
    }
  }
});
