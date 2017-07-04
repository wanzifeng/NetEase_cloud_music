$(function () {
    window.onscroll=null;//取消滚轮事件
   if(localStorage.collection){
       var flag=0;//判断是否有收藏歌曲的哨兵值
       var myCollection=JSON.parse(localStorage.collection);
       var $musiclist = $('#musiclist');
       var li = $('#listitem').html();
       musicControler.data=[];
       for(key in myCollection){
           if(myCollection[key]["collected"]){
               flag++;
               var $li = $(li);
               musicControler.data.push(myCollection[key]["data"]);//将要播放的音乐信息绑定至musicControler对象的data属性中
               $li.children('i').html((flag));
               $li.children('.music').html(myCollection[key]["name"]);
               $li.children('.artist').html(myCollection[key]["author"]);
               $li.children('span').html("删除").css("color","red").addClass("delete");
               $li.appendTo($musiclist);
               $li.data("id",myCollection[key]["data"]).children('span').data("id",key);
               $li.click(function () {
                   musicControler.params=$(this).data('id');
                   musicControler.url="myCollection";
                   musicControler.index=$(this).index();
                   var music=$(this).data('id');
                   musicControler.play();//音乐播放
                   router("musicPlay");//且进入音乐播放详情页
               });
           }
       }
       if(flag==0){//如果该值为零则说明没有收藏
           $('<div class="bad-wrap"><img src="images/bad.png" alt=""><p>你还没有收藏歌曲</p> </div>').appendTo($('.myCollection'));
       } else {
           $(".delete").each(function (i) {
               $(this).click(function () {
                   var id = $(this).data("id");
                   $(this).parent().remove();
                   for (key in myCollection) {
                       if (key == id) {
                           console.log(3)
                           flag--;
                           myCollection[key]["collected"] = false;
                       }
                   }
                   localStorage.collection = JSON.stringify(myCollection);
                   if(flag==0){
                       $('<div class="bad-wrap"><img src="images/bad.png" alt=""><p>你还没有收藏歌曲</p> </div>').appendTo($('.myCollection'));
                   }
                   return false;
               });
           })
       }
   }else{
       $('<div class="bad-wrap"><img src="images/bad.png" alt=""><p>你还没有收藏歌曲</p> </div>').appendTo($('.myCollection'));
   }
});
