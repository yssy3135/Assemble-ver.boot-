

$(function(){
    console.log();

    console.log(geturl("mi_assemblename"))

    let param = window.location.href.split("?")[1];

    let nexturl = "/assemble.io/"+geturl("mi_assemblename")+"/login/"+geturl("ran")+"/a?"+param;

    console.log(nexturl);

    $(".nexturl").append("<a href="+nexturl+">초대 된 ASSEMBLE 가입</a>");


    function geturl(name){
        let url = window.location.href;
        url = url.split("?");
        let data = url[1];
        data = data.split("&");

        for(let i = 0 ; i < data.length; i++){
            let word = data[i].split("=");
            if(word[0] == name){

                return word[1];
            }
        }
    }




})
