
var musicControler={
    url:"",
    backadd:"",
    params:{},
    data:[],
    index:"",
    server: "http://musicapi.duapp.com/api.php",
    play:function (){
        var music=this.data[this.index];//music为当前播放音乐的信息
        $("#pre").click(function () {//通过改变index值来获取上一首格或下一首格的音乐信息；
            this.index--;
            if(this.index<0){
                this.index=this.data.length-1;
            }
            var music=this.data[this.index];
            console.log(music);
            playMyMusic(music);
            return false;
        });
        $("#next").click(function () {
            this.index++;
            if(this.index>this.data.length-1){
                this.index=0;
            }
            var music=this.data[this.index];
            playMyMusic(music);
            return false;
        });
        function playMyMusic(music) {
            $("#global").children("div").addClass("audio-wrap");
            var audio=$('#audio').get(0);//转换成原生的对象
            var music_name=$("#music_name"),music_status=$('#music_status'),music_author=$('#music_author'),avatar_author=$('.avatar_author');
            music_status.html("正在加载...");
            $('#audio-wrap').css("visibility","hidden");
            $("#global").css("backgroundColor","rgba(255,255,255,0.9)");
            avatar_author.attr("src","images/load.gif");
            $.ajax({
                url:this.server+"?type=url&id="+music.al.id,
                success:function (data) {
                    music_status.html("");
                    audio.src=data.data[0].url;
                    audio.play();//数据加载成功，播放音乐；
                    var $btn=$('#btn');
                    $btn.removeClass("pause").addClass("play");
                    $btn.click(function () {
                        if ($(this).hasClass("play")) {
                            $(this).removeClass("play").addClass("pause");
                            audio.pause();
                        } else {
                            $(this).removeClass("pause").addClass("play");
                            audio.play();
                        }
                    });
                    $("#global").css("backgroundColor","transparent");
                    $('#audio-wrap').css("visibility","visible").click(function () {
                        router("musicPlay");//且进入音乐播放详情页
                    });
                    music_name.html(music.name);
                    music_author.html(music.ar[0].name);
                    avatar_author.attr("src",music.al.picUrl);
                }
            });
        }
        playMyMusic(music);
    }
};