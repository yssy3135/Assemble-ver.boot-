

$(document).ready(function() {

    $("#category").click(function(){
        location.href="/makeCategory";
    });

    $(".icon").click(function(){


        var value = document.getElementById("search").value;

        if(value != ""){
            document.location.href = "/searchBoard?value="+value+"&assemble=${mi_assemblename }";

        }else{
            alert("검색어를 입력해주세요");
        }



    });

    $(".sub-menu").click(function(){

        if(this.childNodes[5].style.display == "none" ){

            this.childNodes[5].style.display = "block"
        }else{
            this.childNodes[5].style.display = "none" ;
        }



    });



});
