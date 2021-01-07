package kr.co.assemble.repository;



import java.util.List;


import kr.co.assemble.dto.Chatgogo;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import kr.co.assemble.chat.dto.CHATDTO;
import kr.co.assemble.chat.dto.GroupChatDTO;
import kr.co.assemble.chat.dto.MemberDTO;




@Repository
public class ChatDAOImple implements ChatDAO {

	
	@Autowired
	@Qualifier("sqlSession")
	private SqlSession session;


	@Override
	public List<CHATDTO> getchat(String roomId) {
	
		return session.selectList("getchat",roomId);
	}


	@Override
	public List<MemberDTO> getid(String assemblename) {
		// TODO Auto-generated method stub
		return session.selectList("getmember",assemblename);
	}

	@Override
	public void inputchat(Chatgogo gogo) {

		session.insert("inputchat", gogo);

	}


	@Override
	public void insertgroup(GroupChatDTO insertGroupChat) {
		
		session.insert("insertgroupchat", insertGroupChat);
		
	}


	@Override
	public List<GroupChatDTO> selectgroupchat(int myno) {
		return session.selectList("getgroup",myno);

	}
	
	
	

	
}
