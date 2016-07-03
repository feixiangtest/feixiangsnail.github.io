var tplSearch = require('../tpl/search.string');
var fnUtil = require('../util/fn.util.js');

SPA.defineView('search', {
  html: tplSearch,

  styles: {
    'background': '#eceef0 !important'
  },

  plugins: ['delegated', {
    name: 'avalon',
    options: function (vm) {
      vm.searchlist = [];
      vm.keyword = '';
      vm.getData = function(self) {
        $.ajax({
          url: '/course-webapp/mock/searchlist.json',
          data: {
            keyword: vm.keyword
          },
          success: function (res) {
            // 实际开发大多是后端直接返回结果
            // 直接使用vm.searchlist = res.data; 即可
            vm.searchlist = self.findKeywords(res.data);
          }
        });
      }
    }
  }],

  init: {
    vm: null,
    findKeywords: function (datalist) {
      var newDatalist = [];
      for(var i = 0; i < datalist.length; i++) {
        if(datalist[i].title.indexOf(this.vm.keyword) != -1){
          newDatalist.push(datalist[i]);
        }
      }
      return newDatalist;
    }
  },

  bindActions: {
    'tap.menu': function () {
      fnUtil.showSidebar();
    },
    'tap.clear': function () {
      this.vm.keyword = '';
    }
  },

  bindEvents: {
    'beforeShow': function() {
      var self = this;
      self.vm = this.getVM();
      self.vm.$watch('keyword', function (a, b) {
        this.getData(self);
      });
    }
  }
});
