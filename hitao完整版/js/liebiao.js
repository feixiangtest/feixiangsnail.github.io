$(function () {
    $('.gdheader').load('header.html');
    //    $(".gdfooter").load('footer.html');
    //    var id = parseInt($.cookie("id"));
    //获取数据。
    //获取数据。
    
    
    loadMsg($('#setPage').val());
    
      $(".lth").click(function(){
                    
              loadMsg1($('#setPage').val());  
          
           $('#setPage').change(function () {
        var num = $(this).val();
       
        loadMsg1(num)
    })
          
          
                })
    
    
      $(".htl").click(function(){
                    
              loadMsg2($('#setPage').val());  
          
           $('#setPage').change(function () {
        var num = $(this).val();
       
        loadMsg2(num)
    })
          
          
                })
   
     $(".zh").click(function(){
                    
              loadMsg($('#setPage').val());  
          
           $('#setPage').change(function () {
        var num = $(this).val();
       
        loadMsg(num)
    })
          
          
                })
    
    
    function loadMsg(showNum) {
        var t, t1, t2;
        $.ajax({
            url: 'json/list.json',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                var arr = res;
              
             
                var btnNum = Math.ceil(res.length / $('#setPage').val());
                $('#Pagination').pagination(btnNum, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    items_per_page: 1, //每页显示1项
                    prev_text: "上一页",
                    next_text: "下一页",
                    callback: function (pageIndex) {
                        var html = '<ul>';
                        for (var i = showNum * pageIndex; i < showNum * (pageIndex + 1); i++) {
                            if (i < res.length) {
                                var id = arr[i].id;
                                var info = arr[i].info;
                                var price = arr[i].price;
                                var img = arr[i].img;
                                html += '<li>';
                                html += '<div class="img-warp" id='+arr[i].id+'>';
                                html += '<img src=' + img + ' alt="">';
                                html += '</div>';
                                html += '<div class="info">';
                                html += info;
                                html += '</div>';
                                html += '<div class="price">';
                                html += price;
                                html += '</div>';
                                html += '</li>';
                            }
                        }
                        html += '</ul>';
                        $('#list').html(html);
                    }
                })
            }
        })
    }
    
    
    
     function loadMsg1(showNum) {
        var t, t1, t2;
        $.ajax({
            url: 'json/list.json',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                var arr = res;
              
               
                    
               
                for (var j = 0; j < arr.length - 1; j++) {
                    for (var i = 0; i < arr.length - j - 1; i++) {
                        if (arr[i].price > arr[i + 1].price) {
                            t = arr[i + 1].price;
                            arr[i + 1].price = arr[i].price
                            arr[i].price = t;
                            t1 = arr[i + 1].img;
                            arr[i + 1].img = arr[i].img
                            arr[i].img = t1;
                            t2 = arr[i + 1].id;
                            arr[i + 1].id = arr[i].id
                            arr[i].id = t2;
                       }  
                    }
                }
                var btnNum = Math.ceil(res.length / $('#setPage').val());
                $('#Pagination').pagination(btnNum, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    items_per_page: 1, //每页显示1项
                    prev_text: "上一页",
                    next_text: "下一页",
                    callback: function (pageIndex) {
                        var html = '<ul>';
                        for (var i = showNum * pageIndex; i < showNum * (pageIndex + 1); i++) {
                            if (i < res.length) {
                                var id = arr[i].id;
                                var info = arr[i].info;
                                var price = arr[i].price;
                                var img = arr[i].img;
                                html += '<li>';
                                html += '<div class="img-warp" id='+arr[i].id+'>';
                                html += '<img src=' + img + ' alt="">';
                                html += '</div>';
                                html += '<div class="info">';
                                html += info;
                                html += '</div>';
                                html += '<div class="price">';
                                html += price;
                                html += '</div>';
                                html += '</li>';
                            }
                        }
                        html += '</ul>';
                        $('#list').html(html);
                    }
                })
            }
        })
    }
    
     function loadMsg2(showNum) {
        var t, t1, t2;
        $.ajax({
            url: 'json/list.json',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                var arr = res;
              
                    
               
                for (var j = 0; j < arr.length - 1; j++) {
                    for (var i = 0; i < arr.length - j - 1; i++) {
                        if (arr[i].price < arr[i + 1].price) {
                            t = arr[i + 1].price;
                            arr[i + 1].price = arr[i].price
                            arr[i].price = t;
                            t1 = arr[i + 1].img;
                            arr[i + 1].img = arr[i].img
                            arr[i].img = t1;
                            t2 = arr[i + 1].id;
                            arr[i + 1].id = arr[i].id
                            arr[i].id = t2;
                       }  
                    }
                }
                var btnNum = Math.ceil(res.length / $('#setPage').val());
                $('#Pagination').pagination(btnNum, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    items_per_page: 1, //每页显示1项
                    prev_text: "上一页",
                    next_text: "下一页",
                    callback: function (pageIndex) {
                        var html = '<ul>';
                        for (var i = showNum * pageIndex; i < showNum * (pageIndex + 1); i++) {
                            if (i < res.length) {
                                var id = arr[i].id;
                                var info = arr[i].info;
                                var price = arr[i].price;
                                var img = arr[i].img;
                                html += '<li>';
                                html += '<div class="img-warp" id='+arr[i].id+'>';
                                html += '<img src=' + img + ' alt="">';
                                html += '</div>';
                                html += '<div class="info">';
                                html += info;
                                html += '</div>';
                                html += '<div class="price">';
                                html += price;
                                html += '</div>';
                                html += '</li>';
                            }
                        }
                        html += '</ul>';
                        $('#list').html(html);
                    }
                })
            }
        })
    }
    
    
    $(document).ajaxStop(function(){
     $(".img-warp").click(function(){
        

       
       
       $.cookie("id",$(this).attr("id"))
        
       window.location.href="gdetails.html";
    })
       
     
       
       
})
      
        
   
  
    
    
    
    
})