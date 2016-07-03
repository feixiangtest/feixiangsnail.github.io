var _fnUtil = {
  dataFormat: function(data) {
    var newData = [];
    for (var i = 0; i < Math.ceil(data.length / 2); i++) {
      newData[i] = [];
      newData[i].push(data[i * 2]);
      newData[i].push(data[i * 2 + 1]);
    }
    return newData;
  },

  setActive: function (el) {
    $(el).addClass('active').siblings().removeClass('active');
  },

  showSidebar: function () {
    var el = document.body;
    SPA.show('menu', {
      ani: {
        name: 'popup',
        width: 180,
        autoDirection: false,
        height: $(el).height(),
        duration: 100,
        autoHide: true,
        autoDirection: false,
        direction: 'left'
      }
    }, el);
  },

  pullToRefresh: function(opt) {
    var that = this;
    var myScroll = opt.objScroll || {};
    var ptrHeight = opt.ptrHeight || 35;
    var loaderImg = opt.loaderImg || '/course-webapp/images/ajax-loader.gif';
    var arrowImg = opt.arrowImg || '/course-webapp/images/arrow.png';
    var head = opt.head || $('.head img');
    var foot = opt.foot || $('.foot img');
    var view = opt.view || {};

    myScroll.scrollBy(0, -ptrHeight);

    var topImgHasClass = head.hasClass('up');
    var bottomImgHasClass = head.hasClass('down');

    myScroll.on('scroll', function() {
      var y = this.y,
        maxY = this.maxScrollY - y;
      if (y >= 0) {
        !topImgHasClass && head.addClass('up');
        return '';
      }
      if (maxY >= 0) {
        !bottomImgHasClass && foot.addClass('down');
        return '';
      }
    });

    myScroll.on('scrollEnd', function() {
      if (this.y >= -ptrHeight && this.y < 0) {
        myScroll.scrollTo(0, -ptrHeight);
        head.removeClass('up');
      } else if (this.y >= 0) {
        head.attr('src', loaderImg);

        //ajax上拉刷新数据
        $.ajax({
          url: '/course-webapp/mock/refresh-livelist.json',
          success: function(res) {
            if (res.ret) {
              view.vm.livelist = that.dataFormat(res.data);

              myScroll.refresh();
              myScroll.scrollTo(0, -ptrHeight);
              head.removeClass('up');
              head.attr('src', arrowImg);
            } else {
              console.log('数据有误，请稍后重试。');
            }
          },
          error: function() {
            console.log('服务器发生错误，请稍后重试。')
          }
        });
      }

      var maxY = this.maxScrollY - this.y;
      if (maxY > -ptrHeight && maxY < 0) {
        var self = this;
        myScroll.scrollTo(0, self.maxScrollY + ptrHeight);
        foot.removeClass('down');
      } else if (maxY >= 0) {
        foot.attr('src', loaderImg);

        var self = this;
        $.ajax({
          url: '/course-webapp/mock/more-livelist.json',
          success: function(res) {
            if (res.ret) {
              view.vm.plainLivelist.pushArray(res.data);
              view.vm.livelist = that.dataFormat(view.vm.plainLivelist);

              myScroll.refresh();
              myScroll.scrollTo(0, self.y + ptrHeight);
              foot.removeClass('down');
              foot.attr('src', arrowImg);
            } else {
              console.log('数据有误，请稍后重试。');
            }
          },
          error: function() {
            console.log('服务器发生错误，请稍后重试。')
          }
        });
      }
    });
  }
}

module.exports = _fnUtil;
