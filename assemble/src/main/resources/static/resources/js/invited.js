$(function(){
    var check = "N";
    $("#memEmail").keyup(function(){
        $.ajax({
            type:"post",
            /* url : "assemble.io/<c:out value='${mi_assemblename}' />/login/<c:out value='${ran}' />/a", */
            url : "<c:url value='/emailck'/>",
            data : "mi_mememail=" + $("#memEmail").val(),
            success : function(data) {
                if(data == 1) {
                    $("#duplicate").show();
                    $("#duplicate").css('color', 'red');
                    $("#duplicate").text("이미 사용중인 아이디입니다.");
                    check="N";
                }else if(data == 0 && $("#inputId").val() != ""){
                    $("#duplicate").show();
                    $("#duplicate").css('color', 'green');
                    $("#duplicate").text("사용 가능한 아이디입니다.");
                    check="Y";
                }else {
                    $("#duplicate").hide();
                    check="N"
                }
            }

        })

    });

    $('#invi').click(function(){

        /* console.log(email); */
        $.ajax({
            /* beforeSend: function(){
                loadingBarStart();
            }, */
            type:"post",
            url : "/invitedOk",
            data : "invited=" + $("#memEmail").val() + "&ran=" + $("#ran").val(),

            success : function(data){
                console.log(data);
                alert("초대 완료!");
                document.frm.action="/assemble.io/<c:out value='${mi_assemblename}' />/home?memberno=<c:out value='${memberno}' />";
                document.frm.submit();
            },
            error: function(data){

                alert("에러가 발생했습니다.");
                return false;
            }
        })

    });


});