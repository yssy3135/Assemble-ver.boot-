package kr.co.assemble.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import kr.co.assemble.dto.RecommentDTO;

@Repository
public class RecommentDAOImple implements RecommentDAO{

   @Autowired
   @Qualifier("sqlSession")
   SqlSession ss;
   
   
   public void setSs(SqlSession ss) {
      this.ss = ss;
   }

   //댓글 입력
   @Override
   public void insertComment(RecommentDTO dto) {

      ss.selectList("insertComment", dto);
      
   }

   //댓글 조회
   @Override
   public List<RecommentDTO> recommentlist(int bno) {
      // TODO Auto-generated method stub
      List<RecommentDTO> list = ss.selectList("selectRecommentList", bno);
      return list;
   }
   
}