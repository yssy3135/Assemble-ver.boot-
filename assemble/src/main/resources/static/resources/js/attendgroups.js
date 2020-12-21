$(document).ready(function () {

    <!-- div 바꾸기   -->
    $('.option-button1').click(function(){
        /*         console.log(this.value); */
        window.location.href="/attendgroups?order=created&type=";				//다시 원래 페이지로 돌아오기


    });


    $(".follow-button.unfollowed").each(function () {
        $(this).off("click").on("click", function() {
            var n = this.parentNode.childNodes[5].value;

            if($(this).hasClass("active") && n==0) {

                $(this).removeClass("active");						//클래스 제거
                $(this).siblings().addClass("active");				//siblings:형제요소들,    removeClass:선택된 클래스의 특성을 없앰
                $(this).text('참여하기');
            }else{
                $(this).addClass("active");							//클릭된 부분을 정의된 CCS인 active클래스로 적용
                $(this).siblings().removeClass("active");			//siblings:형제요소들,    removeClass:선택된 클래스의 특성을 없앰

                $(this).text('나가기');

            }


            /* else {

            $(this).addClass("active");							//클릭된 부분을 정의된 CCS인 active클래스로 적용
            $(this).siblings().removeClass("active");			//siblings:형제요소들,    removeClass:선택된 클래스의 특성을 없앰


            $(this).text('나가기');
             */


        });
    });
});

$(function(){
    $(".follow-button.unfollowed").click(function(){
        console.log(this.parentNode.childNodes)
        var groupno = this.parentNode.childNodes[1].value;
        var categoryno = this.parentNode.childNodes[3].value;

        document.location.href = "/attendOk?groupno="+groupno+"&categoryno="+categoryno ;
    });
});

// 게시물이 생기면 footer의 div가 바뀌어야 함.
//$(this).attr('no-content-placeholder no-content-placeholder--visible','paginated-list-footer__no-more-label');

if($(".planet-group-list__item").hasClass("active")) {				/* 클래스명은 게시물에서 가져오기~  */
    $("#contents").hide();						/* div 숨기기~  */
    $("#nocontents").show();
} else {
    $("#contents").show();						/* div 보이기~  */
    $("#nocontents").hide();
}