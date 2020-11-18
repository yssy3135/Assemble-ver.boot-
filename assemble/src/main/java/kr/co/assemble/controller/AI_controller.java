package kr.co.assemble.controller;

import javax.servlet.http.HttpSession;

import kr.co.assemble.repository.MI_interface;
import kr.co.assemble.repository.SendMailImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.assemble.dto.IdCheckDTO;




@Controller
public class AI_controller {

	@Autowired
	MI_interface mi_dao;

	@Autowired
	SendMailImple smi;

	@Autowired
	BCryptPasswordEncoder passEncoder;
	

	public void setmi_dao(MI_interface mi_dao) {
		this.mi_dao = mi_dao;
	}
	
	//메인화면 출력
	@GetMapping("/main")
	public String list(Model model) {

		return "main";
	}
	
	//로그인 화면
	@GetMapping("/assembleLogin")
	public String assembleLogin() {
		
		return "assembleLogin";
	}
	
	
	@RequestMapping(value = "/loginOk")
	public String mainPage(@ModelAttribute IdCheckDTO dto1, HttpSession session) {
		String mi_assembleName = (String) session.getAttribute("mi_assemblename");
//		System.out.println(mi_assembleName);
		dto1.setMi_assemblename(mi_assembleName);
//		System.out.println("dao 들어가기 전" +mi_assembleName);
//		System.out.println("loginOK : "+mi_assembleName);
		
		IdCheckDTO check = mi_dao.selectId(dto1);
//		System.out.println(check.getMi_memid());
		if(check.getMi_memid() == "0") {
			return "loginfail";
		}
		
//		System.out.println("if 후 : " + check.getMi_memid());
		
		boolean passMatch = passEncoder.matches(dto1.getMi_mempw(), check.getMi_mempw());
//		System.out.println("passMatch : " + passMatch);
		int mi_memNo = check.getMi_memberno();
//		System.out.println(check.getMi_memberNo());
//		session.setAttribute("mi_memberNo", mi_memNo);
		session.setAttribute("memberno", mi_memNo);
		session.setAttribute("mi_memname", check.getMi_memname());
		if(passMatch) {
			session.setAttribute("mi_memid", check.getMi_memid());
			
		}else {
			return "loginfail";
		}
		
		return "loginOk";
	}
	
	
	
	
	
	
	
	
	
}
