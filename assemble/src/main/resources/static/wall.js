
    //bookmark click 시 변경
    var cnt = 1;



    const membemi_assemblename = [[${session.mi_assemblename}]];

    $(function(){
    $(".lh").click(function(){
        console.log(this.src.split("/")[6]);
        /*   	 img1.src = "/resources/assets/img/bookmark_before.png";
               img1.src = "/resources/assets/img/bookmark_after.png"; */
        var bno = this.parentNode.childNodes[1].value;
        var groupno = this.parentNode.childNodes[3].value;
        var writerid = this.parentNode.childNodes[5].value;
        if(this.src.split("/")[6].split(".")[0].split(".")[0] == "bookmark_before"){
            this.src = "/resources/assets/img/bookmark_after.png";
            $.ajax({
                url: "/bookmarkinsert",
                type: 'POST',
                data: {"bno": bno, "groupno" : groupno ,"memberno" : memberno,"mark_memno" : writerid },
                dataType: "json",

                success: function(){
                    console.log("성공");
                }

            });


        }else{
            this.src = "/resources/assets/img/bookmark_before.png";

            $.ajax({
                url: "/bookmarkdelete",
                type: 'POST',
                data: {"bno": bno,"memberno" : memberno},
                dataType: "json",

                success: function(){
                    console.log("성공");
                }

            });



        }


    });


});


    //댓글달기
    $(function(){
    $(".submit").click(function(){

        // console.log(this.parentNode.childNodes);

        var bno = this.parentNode.childNodes[1].value;
        var groupno = this.parentNode.childNodes[3].value;
        var recontents = this.parentNode.childNodes[5].value;
        /* var categoryno = this.parentNode.childNodes[5].value; */

        document.location.href = "insertComment?bno="+bno+"&groupno="+groupno+"&contents="+recontents;
    });

    //게시글 option메뉴
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

}//for end
    //댓글0개일때
    if(recomment.length==0){
    var retext =
    '<div id="s0">'
    +'<div id="s1">' + "현재 댓글이 없습니다." +'</div>' //s1 end
    '<div>';
    $(retext).appendTo("#"+bno);
}//if end
}else{
    $("#" +bno).empty();

}
}

});
});
}); //function end



    $(function(){
    $(".sub2").hide(); //처음에는 안보이게

    $(".option2").click(function(){

    var bno = this.parentNode.childNodes[1].value + "d";
    var groupno = this.parentNode.childNodes[3].value;
    console.log(bno);
    console.log(groupno);
    if(document.getElementById(bno)){
    var gg = document.getElementById(bno);
    $(gg).toggle();
}

});

    $(".noti").click(function(){
    console.log(this.parentNode.childNodes);
    var bno = this.parentNode.childNodes[1].value;
    var groupno = this.parentNode.childNodes[3].value;
    console.log(bno);

    $.ajax({
    url : "/assemble.io/{mi_assemblename}/notice",
    type : 'POST',
    data : {"bno": bno, "groupno": groupno},
    dataType: "json",
    success: function(notice){
    console.log("sucess view");
    console.log(notice);
},
    error: function(notice){
    console.log("error view");
    console.log(notice);
}
});//ajax end

});//.noti click end

    $(".del").click(function(){
    console.log(this.parentNode.childNodes);
    var bno = this.parentNode.childNodes[1].value;
    var groupno = this.parentNode.childNodes[3].value;
    console.log(bno);

    $.ajax({
    url : "/assemble.io/{mi_assemblename}/deleteBoard",
    type : 'POST',
    data : {"bno": bno, "groupno": groupno},
    dataType: "json",
    success: function(del){
    console.log("sucess view");
    console.log(del);
},
    error: function(del){
    console.log("error view");
    console.log(del);
}
});//ajax end

});//.modi click end


}); //function end




    //요청 상태 변화
    $(function() {
    var r1 = $('.req');
    var r2 = $('.ing');
    var r3 = $('.end');
    //요청버튼
    $(".req").click(function() {
    var bnoa = this.parentNode.childNodes[1].value + "a";
    var bno = this.parentNode.childNodes[1].value;
    var groupno = this.parentNode.childNodes[3].value;


    console.log(bno);
    console.log(groupno);
    console.log(status);

    //console.log(this.parentNode.childNodes);

    this.parentNode.childNodes[7].style.backgroundColor = "red";
    this.parentNode.childNodes[9].style.backgroundColor = "#EAEAEA";
    this.parentNode.childNodes[11].style.backgroundColor = "#EAEAEA";

    $.ajax({
    url : "/assemble.io/{mi_assemblename}/updateStatus",
    type : 'POST',
    data : {"bno": bno, "groupno": groupno, "status" : 0},
    dataType: "json",
    success: function(req){
    console.log("sucess view");
    console.log(req);
},
    error: function(req){
    console.log("error view");
    console.log(req);
}
});//ajax end
});//.req click end
    //진행버튼
    $(".ing").click(function() {
    var bnoa = this.parentNode.childNodes[1].value + "a";
    var bno = this.parentNode.childNodes[1].value;
    var groupno = this.parentNode.childNodes[3].value;
    var status = this.parentNode.childNodes[5].value;
    console.log("진행");
    console.log(bnoa);

    this.parentNode.childNodes[7].style.backgroundColor = "#EAEAEA";
    this.parentNode.childNodes[9].style.backgroundColor = "green";
    this.parentNode.childNodes[11].style.backgroundColor = "#EAEAEA";

    $.ajax({
    url : "/assemble.io/{mi_assemblename}/updateStatus",
    type : 'POST',
    data : {"bno": bno, "groupno": groupno, "status" : 1},
    dataType: "json",
    success: function(req){
    console.log("sucess view");
    console.log(req);
},
    error: function(req){
    console.log("error view");
    console.log(req);
}
});//ajax end
});//.ing click end
    //종료 버튼
    $(".end").click(function() {
    var bnoa = this.parentNode.childNodes[1].value + "a";
    var bno = this.parentNode.childNodes[1].value;
    var groupno = this.parentNode.childNodes[3].value;
    var status = this.parentNode.childNodes[5].value;
    console.log("종료");
    console.log(bnoa);
    this.parentNode.childNodes[7].style.backgroundColor = "#EAEAEA";
    this.parentNode.childNodes[9].style.backgroundColor = "#EAEAEA";
    this.parentNode.childNodes[11].style.backgroundColor = "gray";

    $.ajax({
    url : "/assemble.io/{mi_assemblename}/updateStatus",
    type : 'POST',
    data : {"bno": bno, "groupno": groupno, "status" : 2},
    dataType: "json",
    success: function(req){
    console.log("sucess view");
    console.log(req);
},
    error: function(req){
    console.log("error view");
    console.log(req);
}
});//ajax end

});//.end click end
});//function end

    $(function(){
    $(".file").click(function(){

    var filename = $(this).val();
    console.log(filename);

    document.location.href = "/download?filename="+filename;
});
});

