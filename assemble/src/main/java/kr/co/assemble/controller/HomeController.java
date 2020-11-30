package kr.co.assemble.controller;


import java.security.acl.Group;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import kr.co.assemble.dto.CategoryDTO;
import kr.co.assemble.dto.GroupDTO;
import kr.co.assemble.repository.CategoryDAO;
import kr.co.assemble.repository.GroupDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.assemble.repository.BoardDAO;
import kr.co.assemble.dto.Groupboard_Memberinfo_FileDTO;
import org.thymeleaf.spring5.view.ThymeleafView;

@Controller
public class HomeController {

	@Autowired
	BoardDAO dao;
	@Autowired
	GroupDAO gdao;
	@Autowired
	CategoryDAO cdao;
	
	private String HOME = "home";
	

	//내가 속한 그룹의 전체 게시글 출력
	@RequestMapping(value = "/assemble.io/{mi_assemblename}/home")
	public String selectMyGroup(@PathVariable("mi_assemblename") String assemblename,
								@RequestParam(value = "memberno") int memberno, Model model, HttpServletRequest request){
		
		//assemblename = (String) session.getAttribute("mi_assembleName");
		
		
		//model.addAttribute("assemblename", assemblename);
		
		List<Groupboard_Memberinfo_FileDTO> list = dao.selectMyFeed(memberno);
		model.addAttribute("mainlist", list);
		System.out.println(list);


		//====================================================\
		//assemblename = (String) session.getAttribute("mi_assembleName");
		int memberNo = Integer.parseInt(request.getParameter("memberno"));
		//System.out.println(assemblename);

		// 카테고리
		CategoryDTO dto = new CategoryDTO();
		dto.setMemberno(memberNo);
		dto.setAssemblename(assemblename);
		List<CategoryDTO> list3 = cdao.myCategory(dto);
		model.addAttribute("categoryList", list3);

		// 그룹
		GroupDTO groupdto = new GroupDTO();
		groupdto.setMemberno(memberNo);
		List<GroupDTO> list2 = gdao.grouplist(groupdto);
		model.addAttribute("groupList", list2);




		return HOME;
	}




	
}

