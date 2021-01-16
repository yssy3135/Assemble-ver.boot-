package kr.co.assemble.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import kr.co.assemble.repository.CategoryDAOImple;
import kr.co.assemble.repository.GroupDAO;
import kr.co.assemble.repository.CategoryDAO;
import kr.co.assemble.repository.GroupDAOImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.assemble.dto.CategoryDTO;
import kr.co.assemble.dto.GroupDTO;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class NavbarController {


	@Autowired
	GroupDAO gdao;
	@Autowired
	CategoryDAO cdao;
	
	
	//카테고리 전체 조회

	@RequestMapping(value = "/assemble.io/{mi_assemblename}/header/{path}")
	public String categoryList(@PathVariable("mi_assemblename") String assemblename,@PathVariable("path") String path,
							  HttpServletRequest request, Model model) {

		//session 받아서 assemble명 바꾸기
		//assemblename = (String) session.getAttribute("mi_assembleName");
		//System.out.println(assemblename);


		HttpSession session = request.getSession();
		System.out.println((int)session.getAttribute("memberno"));
		int memberNo =  (int)session.getAttribute("memberno");
//		model.addAttribute("memberno",memberNo);
		CategoryDTO dto = new CategoryDTO();
		dto.setMemberno(memberNo);
		dto.setAssemblename(assemblename);
		List<CategoryDTO> list = cdao.myCategory(dto);
		model.addAttribute("categoryList", list);
		
//		System.out.println(assemblename);
		
//		List<CategoryDTO> list = cdao.selectCategory(dto);
		
		//categoryno 같을때만 뽑는 조건을 jsp상에서 주었음
		System.out.println(assemblename);
		GroupDTO groupdto = new GroupDTO();
		groupdto.setMemberno(memberNo);
		System.out.println(memberNo);
		List<GroupDTO> list2 = gdao.grouplist(groupdto);	
		model.addAttribute("groupList", list2);
		System.out.println(list2);
		model.addAttribute("memberno", memberNo);



		path = path.replaceAll("`","/");
		model.addAttribute("path",path);

		return path;

	}
	
	@RequestMapping(value="/test")
	public String test1() {
		
		return "include/header";
	}

}
