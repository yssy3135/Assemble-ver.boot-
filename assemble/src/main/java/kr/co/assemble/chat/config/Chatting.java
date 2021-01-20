package kr.co.assemble.chat.config;

public class Chatting {

    private String content;
    private String sendTime;
    private String id;
    private String sender;
    private String roomid;


    public Chatting() {
    }

    public Chatting(String content, String sendTime, String id, String sender, String roomid) {
        this.content = content;
        this.sendTime = sendTime;
        this.id = id;
        this.sender = sender;
        this.roomid = roomid;
    }

    public Chatting(String content){
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSendTime() {
        return sendTime;
    }

    public void setSendTime(String sendTime) {
        this.sendTime = sendTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRoomid() {
        return roomid;
    }

    public void setRoomid(String roomid) {
        this.roomid = roomid;
    }
}
