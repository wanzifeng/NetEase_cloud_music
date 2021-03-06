
var server = "http://musicapi.duapp.com/api.php";
function getPlayList(limit,callback) {
    var $songlist=$('.song-list'),$templatelist=$('#templateItem'),template=$templatelist.html();
    for(var i=0;i<limit;i++){
        var $template=$(template),$a=$template.children("a");//ajax还没有请求回数据是显示的友好信息；
        $a.children('.num').html("加载中...");
        $a.children('img').attr("src","images/default_cover.png");
        $a.children('p').html("加载中...");
        $template.appendTo($songlist);
    }
    if(isCache()){
        callback(JSON.parse(localStorage.list3),JSON.parse(localStorage.list3).length);
        console.log(JSON.parse(localStorage.list3))
        console.log('访问缓存');
    }else{
        console.log('访问网络');
        $.ajax({
            url: server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
            success:function (data) {
                console.log(data)
                var list2=JSON.stringify(data.playlists);
                localStorage.list3=list2;
                localStorage.cacheTime1=new Date().getTime();
                console.log(data.playlists.length);
                callback(data.playlists,data.playlists.length);//调用回调函数
            }
        })
    }
    function isCache() {
        if(!localStorage.list3){
            return false;
        }
        if(new Date().getTime()-localStorage.cacheTime1>1000*10){//设定每十秒之后可以访问网络
            return false;
        }
        return true;
    }
}
getPlayList(15,function (data,num) {
    for(var i=0;i<num;i++){
        var playNum=data[i]["playCount"];
        if(playNum>10000){//若超过10000则显示为XX万
            playNum=playNum.toString();
            playNum=playNum.slice(0,playNum.length-4)+"万";
        }
        var item=$(".item:eq("+(i+1)+")").children("a");
        item.attr("href",'#detail?id='+data[i].id);
        item.children('.num').html(playNum);
        item.children('img').attr("src",data[i].coverImgUrl);
        item.children('p').html(data[i].name);
    }
});
$(function () {
    var oLoadImg=document.getElementsByClassName("load-img")[0];
    var num=9;
    function setImage() {
        num+=9;
        console.log(num)
        var $songlist=$('.song-list'),$templatelist=$('#templateItem'),template=$templatelist.html();
        for(var i=num-9;i<num;i++){
            var $template=$(template),$a=$template.children("a");
            $a.children('.num').html("加载中...");
            $a.children('img').attr("src","images/default_cover.png");
            $a.children('p').html("加载中...");
            $template.appendTo($songlist);
            $template.hide();
        }
        $.ajax({
            url: server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+num,
            success:function (data) {
                var list3=data.playlists;
                for(var i=num-9;i<num;i++){
                    var playNum=list3[i]["playCount"];
                    if(playNum>10000){//若超过10000则显示为XX万
                        playNum=playNum.toString();
                        playNum=playNum.slice(0,playNum.length-4)+"万";
                    }
                    var item=$(".item:eq("+(i+1)+")").children("a");
                    item.attr("href",'#detail?id='+list3[i].id);
                    item.children('.num').html(playNum);
                    item.children('img').attr("src",list3[i].coverImgUrl);
                    item.children('p').html(list3[i].name);
                    item.parent().show();
                }
            }
        })
    }

    function getH(obj) {
        var h=0;
        while (obj){
            h+=obj.offsetTop;
            obj=obj.offsetParent;
        }
        return h;
    }
    function judge() {
        var h=getH(oLoadImg);
        var rootEle=document.documentElement;
        var t=rootEle.clientHeight;
        t+=rootEle.scrollTop||document.body.scrollTop;
        if(h<t-49){
            setImage();
        }
    }
    judge();
    $('.song-list').scroll(function () {
        if($)
        judge();
        return false;
    })
    window.onscroll=function () {
        if($('.song-list').length){
            judge();
        }
    }
});