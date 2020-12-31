
$(document).ready(function() {


    $('#writebtn1').click(function(){
        $("#writediv1").css('display','block');
        $("#writediv2").css('display','none');
        $("#writediv3").css('display','none');
        $(".boarddiv").css('height','310px');

        $("#writebtn1").css('background-color','white');
        $("#writebtn2").css('background-color','#D5D5D5');
        $("#writebtn3").css('background-color','#D5D5D5');





    });

    $('#writebtn2').click(function(){
        $("#writediv1").css('display','none');
        $("#writediv2").css('display','block');
        $("#writediv3").css('display','none');
        $(".boarddiv").css('height','390px');

        $("#writebtn1").css('background-color','#D5D5D5');
        $("#writebtn2").css('background-color','white');
        $("#writebtn3").css('background-color','#D5D5D5');



    });

    $('#writebtn3').click(function(){
        $("#writediv1").css('display','none');
        $("#writediv2").css('display','none');
        $("#writediv3").css('display','block');
        $(".boarddiv").css('height','340px');

        $("#writebtn1").css('background-color','#D5D5D5');
        $("#writebtn2").css('background-color','#D5D5D5');
        $("#writebtn3").css('background-color','white');

    });


        $("#btn1").click(function(){
            var data = $("#fileInput1").val();
            console.log(data);

            if(data==""){

                console.log(document.frm);

                document.frm1.action = "/writeOk";
                document.frm1.submit();
            }else{
                console.log("file in");
                document.frm1.action = "/upload";
                document.frm1.method = "post";
                document.frm1.submit();
            }




        $("#btn3").click(function(){
            var data = $("#fileInput3").val();
            if(data==""){
                console.log("not file");
                document.frm3.action = "/requestOk";
                document.frm3.method = "post";
                document.frm3.submit();
            }else{
                console.log("file in");
                document.frm3.action = "/requestFileOk";
                document.frm3.method = "post";
                document.frm3.submit();
            }

        });



    });



});

$(function() {
    $(function() {
        init();
    })

    function init() {
        $fileBox = $('.input-file1');
        fileLoad();
    }

    function fileLoad() {
        $.each($fileBox, function(idx){
            var $this = $fileBox.eq(idx),
                $btnUpload = $this.find('[type="file"]'),
                $label = $this.find('.file-label1');

            $btnUpload.on('change', function() {
                if(window.FileReader){  // modern browser
                    var filename = $(this)[0].files[0].name;
                } else {  // old IE
                    var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
                }

                // 추출한 파일명 삽입
                $(".file-name1").val(filename); })

            $btnUpload.on('focusin focusout', function(e) {
                e.type == 'focusin' ? $label.addClass('file-focus') : $label.removeClass('file-focus');
            })
        })

    }


    function init() {
        $fileBox = $('.input-file2');
        fileLoad();
    }

    function fileLoad() {
        $.each($fileBox, function(idx){
            var $this = $fileBox.eq(idx),
                $btnUpload = $this.find('[type="file"]'),
                $label = $this.find('.file-label2');

            $btnUpload.on('change', function() {
                if(window.FileReader){  // modern browser
                    var filename = $(this)[0].files[0].name;
                } else {  // old IE
                    var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
                }

                // 추출한 파일명 삽입
                $(".file-name2").val(filename); })

            $btnUpload.on('focusin focusout', function(e) {
                e.type == 'focusin' ? $label.addClass('file-focus') : $label.removeClass('file-focus');
            })
        })

    }


    function init() {
        $fileBox = $('.input-file3');
        fileLoad();
    }

    function fileLoad() {
        $.each($fileBox, function(idx){
            var $this = $fileBox.eq(idx),
                $btnUpload = $this.find('[type="file"]'),
                $label = $this.find('.file-label3');

            $btnUpload.on('change', function() {
                if(window.FileReader){  // modern browser
                    var filename = $(this)[0].files[0].name;
                } else {  // old IE
                    var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
                }

                // 추출한 파일명 삽입
                $(".file-name3").val(filename); })

            $btnUpload.on('focusin focusout', function(e) {
                e.type == 'focusin' ? $label.addClass('file-focus') : $label.removeClass('file-focus');
            })
        })

    }
});