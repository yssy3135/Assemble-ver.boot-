$(document).ready(function(){


    let assemblename = geturl("mi_assemblename");
    let ran = geturl("ran");
    $(".card-title text-center").innerText = geturl(assemblename);


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


    var check = "N";
    $("#inputId").keyup(function(){
        $.ajax({
            type:"post",
            /* url : "assemble.io/<c:out value='${mi_assemblename}' />/login/<c:out value='${ran}' />/a", */
            url : "/assemble.io/"+assemblename+"/login/"+ran+"/duplicateId",
            data : "mi_memid=" + $("#inputId").val(),
            success : function(data) {
                if(data == 1) {
                    $("#duplication").show();
                    $("#duplication").css('color', 'red');
                    $("#duplication").text("이미 사용중인 아이디입니다.");
                    check="N";
                }else if(data == 0 && $("#inputId").val() != ""){
                    $("#duplication").show();
                    $("#duplication").css('color', 'green');
                    $("#duplication").text("사용 가능한 아이디입니다.");
                    check="Y";
                }else {
                    $("#duplication").hide();
                    check="N"
                }
            }

        })

    });




    $('.btn-block').click(function(){

        //아이디 공백 확인
        if($("#inputId").val() == ""){ alert("아이디를 입력해주세요"); $("#inputId").focus(); return false; }


        // 비밀번호 확인
        if($("#inputPassword").val() != $("#confirmPassword").val()){
            alert("비밀번호가 상이합니다");
            $("#inputPassword").val(""); $("#confirmPassword").val("");
            $("#inputPassword").focus(); return false;
        }


        // 체크박스 여부
        /* if(!$("#customeCheck1").is(":checked")){
            alert("약관에 동의해주세요"); $("#customeCheck1").focus(); return; }
        else if(("#customeCheck1").is(":checked")){
            alert("checked");
        } */

        if(!$("#customCheck1").is(":checked")){
            console.log("체크안됨");
            alert("약관에 동의해주세요");
            $("#customeCheck1").focus();
            return false;
        }else {
            console.log("체크됨");
        }

        if(check == "N") {
            alert("아이디를 변경해주세요.");
            return false;
        }

        document.frm.action="../../../../membersignup";
        document.frm.submit();


    });

});