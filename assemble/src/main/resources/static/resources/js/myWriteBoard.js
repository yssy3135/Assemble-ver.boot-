//bookmark click 시 변경
function imgchange() {
    var img = document.getElementById('bk');
    if (img.src.match("before")) {
        img.src = "/resources/assets/img/bookmark_after.png";

        /* location.href="/addBookmark"; */
    }

}

//댓글달기
$(function() {
    $(".submit").click(
        function() {

            // console.log(this.parentNode.childNodes);

            var bno = this.parentNode.childNodes[1].value;
            var groupno = this.parentNode.childNodes[3].value;
            var recontents = this.parentNode.childNodes[5].value;

            document.location.href = "insertComment?bno=" + bno
                + "&groupno=" + groupno + "&contents=" + recontents;
        });

    //option 펼치기
    //option 클래스 밑 a태그 클릭시
    /* 		$(".option>a").click(function() {
     console.log(this.parentNode.childNodes);

     $(this).next("ul").toggleClass("hide");

     }); */
    $('.option .sub').hide(); //처음에는 안보이게
    $('.option').click(function() {
        $('.option .sub').toggle();
    });

});

//댓글 보이기
/* $(document).ready(function(){ */
$(function(){
    $(".re").click(function(){


        var bno = this.parentNode.childNodes[1].value;
        var groupno = this.parentNode.childNodes[3].value;

        $.ajax({
            url: "/assemble.io/{mi_assemblename}/g/{groupno}/selectRecomment",
            type: 'POST',
            data: {"bno": bno, "groupno" : groupno},
            dataType: "json",
            success: function(recomment){
                console.log("success view");
                console.log(recomment);
                //document.getElementById("#"+bno).childNodes.length;

                if(document.getElementById(bno).childElementCount==0){
                    for(var i=0; i<recomment.length; i++){
                        var retext =
                            '<div id="s0">'
                            +'<div id="s1">'
                            +'<div id="s1a">'+recomment[i].reid+"님이 쓴 댓글"+'</div>'
                            +'<div id="s1b">'+recomment[i].redate+'</div>'+
                            '</div>' //s1 end
                            +'<div id="s2">'+recomment[i].recontents+'</div>'+ //s2 end
                            '<div>';
                        $(retext).appendTo("#"+bno);
                    }
                }else{
                    $("#" +bno).empty();

                }
            },
            error : function(recomment){
                console.log("error view");
                console.log(recomment);
                if(document.getElementById(bno).childElementCount==0){
                    var retext =
                        '<div id="s0">'
                        +'<div id="s1">' + "현재 댓글이 없습니다." +'</div>' //s1 end
                    '<div>';
                    $(retext).appendTo("#"+bno);
                }else{
                    $("#" +bno).empty();
                }
            }

        });
    });
});