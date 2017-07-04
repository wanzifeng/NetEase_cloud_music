$(function () {
    var i=0;
    function run() {
        i++;
        $('.mycircle').css("transform","rotate("+(i/2)+"deg)");
    }
    var timer=setInterval(run,30);
    function detailPlay() {
        var currentItem=musicControler.data[musicControler.index];
        $(".layer").css("backgroundImage","url("+currentItem.al.picUrl+")");
        $('.top-music-name').html(currentItem.name);
        $('.bot-music-author').html(currentItem.ar[0].name);
        $(".mycircle").attr("src",currentItem.al.picUrl);
        $("#global").css("display","none");
        $('.back-img').click(function () {//返回上一个页面按钮；通过musicControler.backadd记录上一个页面
            if(musicControler.url=="myCollection"){
                router("tab");
                router(musicControler.backadd,$('#tabcontainer'));
            }else{
                router("detail");
            }
            clearInterval(timer);
            $("#global").css("display","block");
        });
    }
    detailPlay();
    $('.next').click(function () {//下一首按钮
        $(".mycircle").attr("src","images/player-bar.png");
        musicControler.index--;
        if( musicControler.index<0){
            musicControler.index=musicControler.data.length-1;
        }
        musicControler.play();

        detailPlay();
    });
    $(".pre").click(function () {//上一首按钮
        $(".mycircle").attr("src","images/player-bar.png");
        musicControler.index++;
        if(musicControler.index>musicControler.data.length-1){
            musicControler.index=0;
        }
        musicControler.play();
        detailPlay();
    });
    $(".pause-start").click(function () {//暂停按钮
        if ($(this).hasClass("active")) {
            $('.handle').css({"animation":"myrotate 0.5s linear both"})
            clearInterval(timer);
            $(this).removeClass("active");
            $(this).attr("src","images/play.png");
            audio.pause();
        } else {
            timer=setInterval(run,30);
            $('.handle').css({"animation":"myrotateB 0.5s linear both"})
            $(this).removeClass("active").attr("str","images/pause.png");
            $(this).addClass("active");
            $(this).attr("src","images/pause.png");
            audio.play();
        }
    });
});

