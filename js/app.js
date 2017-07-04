
function getUrlParams() {//获取路径参数
    var url=window.location.href;
    var objUrl={};
    var arr=url.split('?');
    if(arr.length>=2){
        var arrp=arr[arr.length-1].split('&');
    }else {
        return objUrl;
    }
    for(var i=0;i<arrp.length;i++){
        var kv=arrp[i].split('=');
        objUrl[kv[0]]=kv[1];
    }
    return objUrl;
}
function getM(){//获取模块名
    var url=window.location.href;
    var arr=url.split('#');
    if(arr.length!=2) return false;
    var arrP=arr[1].split('?');
    return arrP[0];
}
function router(m,container) {//加载模块函数
    container=container||$("#share");
    $.ajax({
        url:"view/"+m+".html",
        success:function (data) {
            container.html(data);
        }
    });
    loadJs(m);
}
function loadJs(m) {//加载js文件
    if(!m)return;
    $.ajax({
        url:"js/"+m+".js",
        success:function (data) {
        }
    });
}
$(function (){//判断是否是初次加载页面；若是初次则进入hello页面
    if(!localStorage.counted){
        localStorage.counted=0;
    }
    localStorage.counted++;
    if(localStorage.counted==1){
        router("hello");
    }else{
        router('audio',$("#global"));
        router("tab");

    }
    /*$.ajax({
        url:"http://music.163.com/#/search/m/?s=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA&type=1",
        type:"GET",
        success:function (data) {
            console.log(data)
        }

    });*/
});
