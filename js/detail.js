
(function () {
    window.onscroll=null;//取消滚轮事件
    $("#prev").click(function () {//------------返回前一个页面
        musicControler.url="";
        musicControler.params={};
        router("tab");
        router(musicControler.backadd,$('#tabcontainer'));//通过musicControler.backadd来确定前一个页面是哪一个页面
    });
    var params = getUrlParams();//通过params来获取路径从而得到接下来ajax请求中的url中id的值
    $(".detail-info").children("img").attr("src","images/default_cover.png");
    $('.author_').children("img").attr("src","images/default_cover.png");
    $('.content_').html("加载中");
    $('.author_').children("span").html("加载中");
    function playlist(id, callback) {
        $.ajax({
            url: "https://api.imjad.cn/cloudmusic?type=playlist&id=" + id,
            success: function (data) {
                callback(data);//数据请求成功后调用回调函数
            }
        });
    }
    playlist(params.id, function (data) {
        $(".detail-wrap").css("background-image","url("+data.playlist.coverImgUrl+")");
        $(".detail-info").children("img").attr("src",data.playlist.coverImgUrl);
        $('.content_').html(data.playlist.name);
        $('.author_').children("img").attr("src",data.playlist.creator.avatarUrl);
        $('.author_').children("span").html(data.playlist.creator.nickname);
        var data=data.playlist.tracks;
        var $musiclist = $('#musiclist');
        var li = $('#listitem').html();
        for (var i = 0; i < data.length; i++) {
            var $li = $(li);

            $li.children('.music').html(data[i].name);

            $li.children('.artist').html(data[i].ar[0].name);
            $li.children('i').html((i+1));
            if(isCollected(data[i]["id"])){//加载时，判断是否被收藏

                $li.children('span').addClass("no yes");

            }else{

                $li.children('span').addClass("no");
            }
            $li.appendTo($musiclist);
            $li.data("music",data[i]).click(function () {
                var music=$(this).data('music');
                var index=$(this).index();//记住索引值，以便上一首和下一首播放
                musicControler.params=$(this).data('music');
                musicControler.data=data;
                musicControler.index=index;
                musicControler.url="detail";

                musicControler.play();
                router("musicPlay");
            });
            $li.children('span').data('music',data[i]).click(function (e) {
                e.stopPropagation();//阻止默认事件
                var musicId=$(this).data("music")["id"];
                var musicName=$(this).data("music")["name"];
                var musicAuthor=$(this).data("music")["ar"][0]["name"];
                var musicData=$(this).data("music");
                if(localStorage.collection){//判断是否有缓存数据

                    var list=JSON.parse(localStorage.collection);

                    if(!(list[musicId]&&list[musicId]["collected"])){//若在缓存中，该id没有被记录，若记录且所对应的键值为false
                        list[musicId]={};
                        list[musicId]["collected"]=true;
                        list[musicId]["author"]=musicAuthor;
                        list[musicId]["name"]=musicName;
                        list[musicId]["data"]=musicData;
                    }else{
                        list[musicId]["collected"]=false;
                    }
                    localStorage.collection=JSON.stringify(list);
                }else{//若没有收藏；
                    var collection={};
                    collection[musicId]=true;
                    collection[musicId]["author"]=musicAuthor;
                    collection[musicId]["name"]=musicName;
                    collection[musicId]["data"]=musicData;
                    localStorage.collection=JSON.stringify(collection);
                }
                $(this).toggleClass("yes");
            });
        }
    });
    function isCollected(id){//加载时判断这条数据的ID值是否被记录且该ID的boolean

        if(localStorage.collection){
            var list=JSON.parse(localStorage.collection);
        }else{
            return false
        }
        if(list[id]&&list[id]["collected"]){
            return true
        }else{
            return false
        }
    }
})();