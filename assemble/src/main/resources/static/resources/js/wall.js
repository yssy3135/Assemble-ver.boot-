
    //bookmark click 시 변경
    var cnt = 1;


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





    //댓글달기

    $(".submit").click(function(){

        // console.log(this.parentNode.childNodes);

        var bno = this.parentNode.childNodes[1].value;
        var groupno = this.parentNode.childNodes[3].value;
        var recontents = this.parentNode.childNodes[5].value;
        /* var categoryno = this.parentNode.childNodes[5].value; */

        document.location.href = "insertComment?bno="+bno+"&groupno="+groupno+"&contents="+recontents;
    });

    //게시글 option메뉴


    //댓글 보이기
    /* $(document).ready(function(){ */
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

});//.del click end






$(document).on('click','.modi',function(){

    let target = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[0];
    let contents = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[0].textContent;

    if(target.readOnly){
        this.value = "수정완료"
        target.readOnly = false;
        target.disabled = false;
    }else{
        this.value = "수정하기";
        let bno = this.parentNode.childNodes[1].value;
        let groupno = this.parentNode.childNodes[3].value;
        let url = window.location.pathname;
        url = url.split("/");
        $.ajax({
            url : "/"+url[2]+"/group/"+url[4]+"/board",
            data: {bno : bno, groupno : groupno, contents : target.value },
            type : "Patch",
            dataType: "json",
            success: function(){
                target.value = target.value;
                target.readOnly = true;
                target.disabled = true;
            },
            error: function(req){
                console.log("error view");
                console.log(req);
            }
        });//ajax end
    }
})



$(document).on('click','.del',function(){

        let bno = this.parentNode.childNodes[1].value;
        let groupno = this.parentNode.childNodes[3].value;

        let url = window.location.pathname;
        url = url.split("/");
        $.ajax({
            url : "/"+url[2]+"/group/"+url[4]+"/board",
            data: {bno : bno, groupno : groupno,  },
            type : "DELETE",
            dataType: "json",
            success: function(){
                location.reload();
            },
            error: function(req){
                console.log("error view");
                console.log(req);
            }
        });//ajax end

})





    //요청 상태 변화
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

    $(".file").click(function(){

    var filename = $(this).val();
    console.log(filename);

    document.location.href = "/download?filename="+filename;
});

/* *****************************REST 부분*******************************/
        let url = window.location.pathname;
        url = url.split("/");

        console.log(url);
        $.ajax({
            url : "/"+url[2]+"/group/"+url[4]+"/board",
            type : 'GET',
            dataType: "json",
            success: function(data){

                for(let i = 0 ; i<data.length; i++){

                    let body ='<div id="board">'+
                                '<div id="z">';

                    if(data[i].boardnotice == 1){
                        body  = body + '<img src="/resources/assets/img/star.png" alt="공지글"  id="notice"/>'+
                            '<b> 공지글</b>'
                    }
                    body = body + '</div>';
                    body = body + '<div id="b">';

                    if(data[i].requestboolean == 1){
                        body = body + '<h4><b>담당자 : '+data[i].responseid+'</b></h4>';
                    }
                    body = body + '<textarea class = "contents"  readonly disabled>'+data[i].boardcontents+'</textarea>'
                    if(data[i].requestboolean == 1) {

                        if (data[i].reqstatus == 0) {
                            body = body + '<div class="btn-group" style="float: right"; id ="' + data[i].bno + 'a">\n' +
                                '                                    <input type="hidden" name="req_bno" value="' + data[i].bno + '"/>\n' +
                                '                                    <input type="hidden" name="req_groupno" value="' + data[i].groupno + '"/>\n' +
                                '                                    <input type="hidden" name="req_reqstatus" value="' + data[i].reqstatus + '"/>\n' +
                                '                                    <input type="button" value="요청" id="btnra" class="req"/>\n' +
                                '                                    <input type="button" value="진행" id="btnia" class="ing"/>\n' +
                                '                                    <input type="button" value="종료" id="btnea" class="end"/>\n' +
                                '                                </div>'
                        } else if (data[i].reqstatus == 1) {
                            body = body + '<div class="btn-group" style="float: right";id ="' + data[i].bno + 'a">\n' +
                                '                                    <input type="hidden" name="req_bno" value="' + data[i].bno + '"/>\n' +
                                '                                    <input type="hidden" name="req_groupno" value="' + data[i].groupno + '"/>\n' +
                                '                                    <input type="hidden" name="req_reqstatus" value="' + data[i].reqstatus + '"/>\n' +
                                '                                    <input type="button" value="요청" id="btnrb" class="req"/>\n' +
                                '                                    <input type="button" value="진행" id="btnib" class="ing"/>\n' +
                                '                                    <input type="button" value="종료" id="btneb" class="end"/>\n' +
                                '                                </div>'
                        } else if (data[i].reqstatus == 2) {
                            body = body + '<div class="btn-group" style="float: right";id ="' + data[i].bno + 'a">\n' +
                                '                                    <input type="hidden" name="req_bno" value="' + data[i].bno + '"/>\n' +
                                '                                    <input type="hidden" name="req_groupno" value="' + data[i].groupno + '"/>\n' +
                                '                                    <input type="hidden" name="req_reqstatus" value="' + data[i].reqstatus + '"/>\n' +
                                '                                    <input type="button" value="요청" id="btnrc" class="req"/>\n' +
                                '                                    <input type="button" value="진행" id="btnic" class="ing"/>\n' +
                                '                                    <input type="button" value="종료" id="btnec" class="end"/>\n' +
                                '                                </div>'
                        }

                    }
                        if(data[i].filename != null){
                            body = body+'<h5>파일명 : <input type="button" value="'+data[i].filename+'" class="file"/></h5>';
                        }

                        body = body + '</div>' +
                            '                   <div id="c">\n' +
                            '                        <div id="c1">\n' +
                            '                            <input type="hidden" name="bno" value="'+data[i].bno+'"/>\n' +
                            '                            <input type="hidden" name="groupno" value="'+data[i].groupno+'"/>\n' +
                            '                            <input type="hidden" name="memberid" value="'+data[i].mi_memid+'"/>\n' +
                            '                            <input type="button" value="댓글" class="re" />\n' +
                            '                            <img src="/resources/assets/img/bookmark_before.png" id="bk" class="lh"/>\n' +
                            '                        </div>\n' +
                            '                        <div class="c2" >\n' +
                            '                            <input type="hidden" name="bno" value="'+data[i].bno+'"/>\n' +
                            '                            <input type="hidden" name="groupno" value="'+data[i].groupno+'"/>\n' +
                            '                            <input type="button" class="option2"/>\n' +
                            '                            <!-- <input type="button" value="more" class="option" onclick="optiontest()"/> -->\n' +
                            '                            <!-- <button class="option">\n' +
                            '                                <img src="/resources/assets/img/more.png" id="more" />\n' +
                            '                            </button> -->\n' +
                            '                            <div id="'+data[i].bno+'d" class="sub2">\n' +
                            '                                <ul>\n' +
                            '                                    <li>\n' +
                            '                                        <input type="hidden" name="bno" value="'+data[i].bno+'""/>\n' +
                            '                                        <input type="hidden" name="groupno" value="'+data[i].groupno+'""/>';


                        if(data[i].boardnotice == 0){
                            body = body + '                                  <input type="button" value="공지등록" class="noti"/>\n' +
                                '                                            <input type="button" value="수정하기" class="modi"/>\n' +
                                '                                            <input type="button" value="삭제하기" class="del"/>';
                        }else if (data[i].boardnotice==1){
                            body = body + '                                  <input type="button" value="공지취소" class="noti"/>\n' +
                                '                                            <input type="button" value="수정하기" class="modi"/>\n' +
                                '                                            <input type="button" value="삭제하기" class="del"/>';
                        }


                        body = body + '                                    </li>\n' +
                            '                                </ul>\n' +
                            '                            </div>\n' +
                            '                        </div><!--c2 end  -->\n' +
                            '                    </div><!-- c end -->\n' +
                            '\n' +
                            '                    <div class="e" id="'+data[i].bno+'">\n' +
                            '                        <!-- 댓글 div -->\n' +
                            '                    </div>\n' +
                            '\n' +
                            '                    <div id="d">\n' +
                            '                        <input type="hidden" name="bno" value="'+data[i].bno+'""/>\n' +
                            '                        <input type="hidden" name="groupno" value="'+data[i].groupno+'"/>\n' +
                            '                        <input type="text" name="" id="retext" placeholder=" 댓글을 입력하세요" />\n' +
                            '                        <input type="button" value="등록" class="submit"/>\n' +
                            '                    </div>\n' +
                            '\n' +
                            '                </div>\n' +
                            '        </div>';







                    $("#boarddis").append(body);
                    $(".sub2").hide(); //처음에는 안보이게
                }





            },
            error: function(req){
                console.log("error view");
                console.log(req);
            }
        });//ajax end



        $(document).on('click','.option2',function(){
            var bno = this.parentNode.childNodes[1].value + "d";
            var groupno = this.parentNode.childNodes[3].value;
            var gg = document.getElementById(bno);
            $(gg).toggle();

        })



    });





