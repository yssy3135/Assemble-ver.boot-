$(function(){


    const myno = document.getElementById("myno").value;
    const mi_memid = document.getElementById('mi_memid').value;

    chatroomside();
    connect();

    $('.show1').hide();          //페이지를 로드할 때 숨길 요소 [채팅창화면]
    $('.show2').hide();          //페이지를 로드할 때 숨길 요소 [새로운채팅화면]
    $("form").on('submit', function (e) {
        e.preventDefault();
    });


    function clicktest(){
        console.log("온클릭 테스트")
    }


    // 회원 목록 리스트 반환
    function chatroomside(){

        $.ajax({
            url: "/chatroom/getmemlist",
            type : "POST",
            dateType :"list",
            success: function(data){
                for(let i = 0 ; i < data.length;i++){
                  if(data[i].mi_memid != mi_memid){
                      $('#alllist').append('<li class="memno">\n' +
                          '<span class="dot" id ='+data[i].mi_memberno+'d></span> \n' +
                          '<div>\n' +
                          '<h2 class="memname" id='+data[i].mi_memid+'>'+data[i].mi_memname+"("+data[i].mi_memid+")"+'</h2>\n' +
                          '<input type="hidden"  value='+data[i].mi_memberno+' />\n' +
                          '<input type="hidden"  value='+data[i].mi_memname+' />\n' +
                          '</div>\n' +
                          '</li>')


                      /*그룹채팅 멤버 추가*/
                      $('.dropdown-content').append('<div class= "memberblock" id = '+data[i].mi_memberno+'>\n'+
                          '                                <a href="#" ">\n' +
                          '                                <span>'+data[i].mi_memname+'('+data[i].mi_memid+')</span>' +
                          '                                <input type="hidden" id = "memno"  value='+data[i].mi_memberno+' />\n' +
                          '                                <input type="hidden" id = "memname" value='+data[i].mi_memname+' />\n' +
                          '                                <input type="hidden" id = "memid" value='+data[i].mi_memid+' />\n' +
                          '                                </a>' +
                          '                            </div>')


                  }else{
                      $('#alllist').append('<input type="hidden" id="myno" value='+data[i].mi_memberno+' />\n' +
                          '                 <input type="hidden" id="myname" value='+data[i].mi_memname+' />')
                  }
                }





            },
            error: function(){

            }


        });// ajax end
    } // chatroomside end


    function connect(){
        var socket = new SockJS('/websocket');

        console.log(socket);
        stompClient = Stomp.over(socket);


        stompClient.connect({}, function (frame) {

            console.log('Connected: ' + frame);
            // 주소 구독
            stompClient.subscribe('/topic/'+myno, function (chatting) {
                if(JSON.parse(chatting.body).sender != myno){
/*                    console.log("방이름 옐로우"+JSON.parse(greeting.body).sender);
                    console.log( document.getElementById(JSON.parse(greeting.body).sender+"d").parentNode.childNodes[5].innerText);
                    console.log(document.getElementById("panel-title").innerText);
                    console.log( document.getElementById(JSON.parse(greeting.body).sender+"d").parentNode.childNodes[5].innerText);*/

                    var panel =   document.getElementById("panel-title");
                    if(panel.innerText ==  document.getElementById(JSON.parse(chatting.body).sender+"d").parentNode.children[1].children[2].value){
                        document.getElementById(JSON.parse(chatting.body).sender+"d").style.backgroundColor ="blue";
                    }
                }
            });// connection end
        });


    };// connect end




    // 아이디 사이드바 클릭시
    $(document).on("click",".memno",function(){

        let room;
        let receivername;
        if(this.id== "groupchat"){
            console.log("그룹챗");

            receivername = this.childNodes[1].innerText;
            receiverno =this.childNodes[1].childNodes[1].id;
            //console.log(this.childNodes[1]..childNodes[1].id);
            room = receiverno;
            /*  receiverno = this.childNodes[1].childNodes[0].id.split(","); */
            room = this.childNodes[1].childNodes[1].id;

            console.log("방번호"+receivername);



        }else{

            receivername = this.childNodes[3].childNodes[5].value;
            receiverno = this.childNodes[3].childNodes[3].value;
            console.log()

            document.getElementById(receiverno+"d").style.backgroundColor ="#bbbbbb";
            var me = document.getElementById("myno").value;
            // var receiverno = this.childNodes[5].childNodes[5].value;

            if(me>receiverno){
                room = receiverno+me;
            }else{
                room = me+receiverno;
            }

        }

        document.getElementById("chatbox").style.display = "block";
        var memno = document.getElementsByClassName("memno");


        // document.getElementById("myid")
        console.log(document.getElementById("myno").value);
        console.log(document.getElementById("myname").value);

        sendernameid = document.getElementById("myname").value+mi_memid;
        console.log(sendernameid);

        //사용자 이름 표시
        var aaa=  document.getElementById("panel-title");
        console.dir(receivername);
        aaa.innerText = receivername;
        console.log(aaa.innerText);
        nameid = sendernameid;

        console.log("룸네임"+room)
        rooom = room;

        /*----------------------------------------------------------------  */

        $("").appendTo("#messagebody");
        $("#messagebody").empty();


        connect2();

        function connect2() {
            var socket2 = new SockJS('/websocket');
            stompClient2= Stomp.over(socket2);
            stompClient2.connect({}, function (frame) {
                console.log("커넥트 2")
                stompClient2.subscribe('/topic/'+room, function (greeting) {

                    console.log("불거오기 완료")

                    // 채팅 내용 불러오기
                    if(JSON.parse(greeting.body).sender != myno){
                        var receivebody =   '<div class="row msg_container base_receive">'+
                            '<div class="col-xs-10 col-md-10">'+
                            '<div class="messages msg_receive">'+
                            '<p> '+JSON.parse(greeting.body).content+'</p>'+
                            '<time datetime="2009-11-13T20:00">'+JSON.parse(greeting.body).id+" "+JSON.parse(greeting.body).sendTime+'</time>'+
                            '</div>'+
                            '</div>'+
                            '</div>'
                        $(receivebody).appendTo("#messagebody");
                    }
                });

            });   //불러오기end

            $.ajax({
                url: "/chatroom/room/getchat",
                type : "POST",
                dateType :"list",
                data : {"roomid":room},
                success: function(list){
                    for(var i=0 ; i <list.length;i++){
                        var body = "";
                        var memno = document.getElementsByClassName("memno");
                        //   console.log("성공"+list[i].chatcontent);

                        if(list[i].senderno == myno){
                            body =      '<div class="row msg_container base_sent">' +
                                '<div class="col-md-10 col-xs-10 " id="sent">' +
                                '<div class="messages msg_sent" id="msgsent">' +
                                '<p>'+ list[i].chatcontent + '</p>'+
                                ' <time>'+sendernameid+'• '+list[i].chattime+'</time>'+
                                '</div>' +
                                '</div>' +
                                '</div>';

                        }else {
                            /*    console.log(document.getElementById(list[i].senderno).childNodes[1])  */

                            body =   '<div class="row msg_container base_receive">'+
                                '<div class="col-xs-10 col-md-10">'+
                                '<div class="messages msg_receive">'+
                                '<p> '+list[i].chatcontent+'</p>'+
                                ' <time>'+document.getElementById(list[i].senderno).childNodes[1].innerText+'•'+list[i].chattime+'</time>'+
                                '</div>'+
                                '</div>'+
                                '</div>'
                        }

                        $(body).appendTo("#messagebody");
                    }
                }
            });// ajax end
        }

    });

    /*전송 버튼 클릭시*/
    $( "#btn-chat" ).click(function() {
        send()
    });



    // 보내기 function start
    function send(){

        //document.getElementById("myname").value
        var name =  $("#name").val();
        let contents =  $("#btn-input").val();


        //방 이름 설정
        var room;
        var me = document.getElementById("myno").value;
        /*        var receiverno = this.childNodes[5].childNodes[5].value;

              if(me>receiverno){
                 room = receiverno+me
              }else{
                 room = me+receiverno
              } */


        var message = {
            'id': nameid,
            'content' : contents,
            'roomid' : rooom,
            'sender' : document.getElementById("myno").value
        };

        console.log(JSON.stringify(message));

        stompClient.send("/welcome/"+rooom, {}, JSON.stringify(message));
        stompClient2.send("/status/"+receiverno, {}, JSON.stringify(message));


        //여기서'name'이라는 변수에 name을 받아서 전송

        //세션을 엮어서 아이디로 출력
        /* {'contents': $("#contents").val() } */

        var chat = $("#btn-input").val();
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

        if (chat =="") {
            alert('메시지를 입력하세요');
        } else {
            var body = '<div class="row msg_container base_sent">' +
                '<div class="col-md-10 col-xs-10 " id="sent">' +
                '<div class="messages msg_sent" id="msgsent">' +
                '<p>' + chat + '</p>' +
                ' <time datetime="2009-11-13T20:00">' + sendernameid + '•' + time + '</time>' +
                '</div>' +
                '</div>' +
                '</div>';


            $(body).appendTo("#messagebody");

            $('#btn-input').val('');

            $("#messagebody").animate({scrollTop: $("#messagebody")[0].scrollHeight}, 'slow');

            // db에 채팅내용 저장
            $.ajax({
                url: "/chatroom/room/inputchat/",
                type: "POST",
                data: {
                    "roomid": rooom,
                    "assemblename": "${mi_assembleName}",  //세션에서 어셈블이름 불러와야함
                    "chatcontents": contents,
                    "senderno": myno
                }
            });
        }

    }

    /*채팅 엑스버튼 클릭*/
    $(document).on('click', '.icon_close_chat', function (e) {
        //$(this).parent().parent().parent().parent().remove();
        $( "#chatbox" ).hide();
    });
    
    /*채팅 플러스 버튼클릭*/
    $('.icon_plus').click(function(){
        document.getElementById("pluschatbox").style.display = "block";

        map.clear();
        console.log(1);
    })


    /*추가채팅 엑스버튼*/
    $(document).on('click', '.icon_close_new', function (e) {
        //$(this).parent().parent().parent().parent().remove();
        $( "#pluschatbox" ).hide();
    });

    /*채팅 내리기*/
    $(document).on('click', '.panel-heading span.icon_arrow-down', function (e) {
        var $this = $(this);

        if (!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down');
        }
    });


    /*채팅 추가 리스트트*/
   $('.dropdown-content').click(function () {
        var input, filter, ul, li, a, i;

        input = document.getElementById("myInput");

        filter = input.value.toUpperCase();

        div = document.getElementById("myDropdown");
        a = div.getElementsByTagName("a");

        for (i=0; i<a.length; i++) {
            txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "block";                        /* 검색을 하면 리스트 보이게  */
            } else {
                a[i].style.display = "none";
            }
        }
    });


    $('#listsearch').keyup(function(){

        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("listsearch");
        filter = input.value.toUpperCase();
        ul = document.getElementById("alllist");
        li = ul.getElementsByTagName("li");

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    });


    const map =new Map();
    /* 그룹 채팅 선택 */
    function newstartchat(name,id,plusmemberno) {

        pulsmember = name+"("+id+")";
        console.log("넘어온 데이터", pulsmember+plusmemberno);

        if(map.has(plusmemberno)){

            map.delete(plusmemberno);
            var block = document.getElementById(plusmemberno);
            block.style.backgroundColor = "#f6f6f6";
        }else{
            map.set(plusmemberno,pulsmember);

            var block = document.getElementById(plusmemberno);
            block.style.backgroundColor = "#00bcd4";

        }
        console.dir(map);



        var clickmem = document.getElementById("new-chat");

        clickmem.style.color = "#497BD9";                  //검색해서 나온 이용자를 클릭 하면 버튼 활성화!
        /* color: #497BD9; 버튼이 파란색으로 바뀐다..... */

    };



    $(document).on('click','.memberblock a',function(){
        let memno = this.children[1].value;
        let memname = this.children[2].value;
        let memid = this.children[3].value;

        newstartchat(memname,memid,memno);


    })






})