package kr.co.assemble.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import kr.co.assemble.repository.MyWriteDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.assemble.dto.MyWriteDTO;

@Controller
public class MyWriteController {
   
   @Autowired
   MyWriteDAO dao;
   
   @RequestMapping(value = "/myBoard")
   public String myWrite(HttpSession session, Model model) {
      
	  int memberno = (int) session.getAttribute("memberno");
	  String assemblename  = (String) session.getAttribute("mi_assemblename");
      MyWriteDTO dto = new MyWriteDTO();
      dto.setMemberno(memberno);
      List<MyWriteDTO> list = dao.myWrite(dto);
      
      model.addAttribute("mywirtelist", list);
      model.addAttribute("memberno", memberno);      



      return "forward:/assemble.io/"+assemblename+"/header/board`myWriteBoard";
   }
   
}