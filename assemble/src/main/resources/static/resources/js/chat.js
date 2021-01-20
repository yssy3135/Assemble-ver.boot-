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





    // 회원 목록 리스트 반환
    function chatroomside(){

        $.ajax({
            url: "/chatroom/getmemlist",
            type : "POST",
            dateType :"list",
            success: function(data){
                for(let i = 0 ; i < data.length;i++){
                  if(data[i].mi_memid == mi_memid){
                      $('#alllist').append('<li class="memno">\n' +
                          '<span class="dot" id ='+data[i].mi_memberno+'d></span> \n' +
                          '<div>\n' +
                          '<h2 class="memname" id='+data[i].mi_memid+'>'+data[i].mi_memname+"("+data[i].mi_memid+")"+'</h2>\n' +
                          '<input type="hidden"  value='+data[i].mi_memberno+' />\n' +
                          '<input type="hidden"  value='+data[i].mi_memname+' />\n' +
                          '</div>\n' +
                          '</li>')
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
            stompClient.subscribe('/queue/'+myno, function (chatting) {
                if(JSON.parse(chatting.body).sender != myno){
/*                    console.log("방이름 옐로우"+JSON.parse(greeting.body).sender);
                    console.log( document.getElementById(JSON.parse(greeting.body).sender+"d").parentNode.childNodes[5].innerText);
                    console.log(document.getElementById("panel-title").innerText);
                    console.log( document.getElementById(JSON.parse(greeting.body).sender+"d").parentNode.childNodes[5].innerText);*/

                    var panel =   document.getElementById("panel-title");
                    if(panel.innerText !=  document.getElementById(JSON.parse(chatting.body).sender+"d").parentNode.childNodes[5].innerText){
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
                stompClient2.subscribe('/queue/'+room, function (greeting) {

                    console.log("불거오기 완료")

                    // 채팅 내용 불러오기
                    if(JSON.parse(greeting.body).sender != myno){
                        var receivebody =   '<div class="row msg_container base_receive">'+
                            '<div class="col-xs-10 col-md-10">'+
                            '<div class="messages msg_receive">'+
                            '<p> '+JSON.parse(greeting.body).content+'</p>'+
                            '<time datetime="2009-11-13T20:00">'+JSON.parse(greeting.body).id+JSON.parse(greeting.body).sendTime+'</time>'+
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





})