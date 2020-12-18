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

    $(document).ready(function () {

        // 게시물이 생기면 footer의 div가 바뀌어야 함.
        //$(this).attr('no-content-placeholder no-content-placeholder--visible','paginated-list-footer__no-more-label');

        if($(".sdf").hasClass("active")) {
            $("#contents").hide();						/* div 숨기기~  */
            $("#nocontents").show();
        } else {
            $("#contents").show();						/* div 보이기~  */
            $("#nocontents").hide();
        }

    });

});//function end