$(function(){

    chatroomside();

    function chatroomside(){
    let mi_memid = document.getElementById('mi_memid').value;
        $.ajax({
            url: "/chatroom/getmemlist",
            type : "POST",
            dateType :"list",
            success: function(data){
                for(let i = 0 ; i < data.length;i++){
                  if(data[i].mi_memid != mi_memid){
                      $('#alllist').append('<li class="memno">\n' +
                          '<span class="dot" id ='+data[i].mi_memberno+'+\'d\'" ></span> \n' +
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
    }
})