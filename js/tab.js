
$(function () {
    window.onscroll=null;//取消滚轮事件
    function load(m){
        m=m||"home";
        musicControler.backadd=m;
        router(m,$('#tabcontainer'));
    }
    musicControler.backadd=musicControler.backadd||"home";
    load(musicControler.backadd);
    if(musicControler.backadd=="songlist"){//tab页面加载时通过判断musicControler.backadd的值而给哪个tabItem加active类名
        $("#m2").addClass("active").siblings().removeClass("active");
    }else if(musicControler.backadd=="myCollection"){
        $("#m4").addClass("active").siblings().removeClass("active");
    }
   $("#m1").click(function(){
       musicControler.backadd="home";
       $(this).addClass("active").siblings().removeClass("active");
       load("home");
   });
    $("#m2").click(function () {
        musicControler.backadd="songlist";
        $(this).addClass("active").siblings().removeClass("active");
        load("songlist");
    });
    $("#m3").click(function () {
        musicControler.backadd="rank";
        $(this).addClass("active").siblings().removeClass("active");
        load("rank");
    });
    $("#m4").click(function () {
        musicControler.backadd="myCollection";
        $(this).addClass("active").siblings().removeClass("active");
        load("myCollection");
    });
});