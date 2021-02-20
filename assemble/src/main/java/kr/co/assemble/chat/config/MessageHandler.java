package kr.co.assemble.chat.config;


import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class MessageHandler {


    @MessageMapping("/hello")
    @SendTo("/topic/all")
    public Chatting greeting(Chatting message) throws Exception{
        System.out.println("메시지 컨트롤");
        System.out.println(message);

        //0을 보내면 회색 1을 보내면 초록색

        Thread.sleep(1000);

        return new Chatting("Hello," + HtmlUtils.htmlEscape(message.getId()) + "!" + ":"+HtmlUtils.htmlEscape(message.getContent()));
    }


    /* @SendTo("/queue/{roomid}") */
    @MessageMapping("/status/{memberno}")
    @SendTo("/topic/{memberno}")
    public Chatting welcome(Chatting message,@DestinationVariable String memberno) throws Exception{

        System.out.println(message.getRoomid());
        System.out.println("노란색");

        //System.out.println("rpomname"+roomname);

        SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm:ss");
        String time = sdf.format(new Date());


        //return new Greeting("Hello," +HtmlUtils.htmlEscape(message.getName())+"님 접속했습니다" );
        return new Chatting(message.getContent(),time,message.getId(),message.getSender(),message.getRoomid());

    }


    @MessageMapping("/welcome/{roomid}")
    @SendTo("/topic/{roomid}")
    public Chatting tmp(Chatting message,@DestinationVariable String roomid) throws Exception{

        System.out.println(message.getId());
        System.out.println(message.getRoomid());
        System.out.println(message.getContent());
        System.out.println(message.getSender());
        System.out.println("0----------");
        System.out.println("컨트롤러");

        //System.out.println("rpomname"+roomname);

        SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm:ss");
        String time = sdf.format(new Date());


        //return new Greeting("Hello," +HtmlUtils.htmlEscape(message.getName())+"님 접속했습니다" );
        return new Chatting(message.getContent(),time,message.getId(),message.getSender(),message.getRoomid());

    }





}
