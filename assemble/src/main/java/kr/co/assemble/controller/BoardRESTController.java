package kr.co.assemble.controller;


import kr.co.assemble.dto.*;
import kr.co.assemble.repository.BoardDAO;
import kr.co.assemble.repository.ComposedDAO;
import kr.co.assemble.repository.GroupSelectListDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class BoardRESTController {

    @Autowired
    BoardDAO dao;

    @Autowired
    ComposedDAO cdao;

    @Autowired
    GroupSelectListDAO gslDao;


    //그룹별 게시글 조회
    //그룹별 정보, 구성원 정보(Groups_Memberinfo_Composed_DTO)
    @GetMapping("/{mi_assemblename}/group/{groupno}/board")
    public List<Groupboard_Memberinfo_FileDTO> groupBoard(@PathVariable("groupno")int groupno,
                             @PathVariable("mi_assemblename") String assemblename, Model model){

        //그룹별 게시글 출력
        List<Groupboard_Memberinfo_FileDTO> list3 = dao.boardlist(groupno);
        model.addAttribute("thirdlist", list3);


        return list3;
    }


    @PatchMapping(value = "/{mi_assemblename}/group/{groupno}/board")
    public void modifyBoard(
            @RequestParam(value = "bno") int bno,
            @RequestParam(value = "contents") String contents,
            @RequestParam(value = "groupno") int groupno) {

        BoardDTO dto = new BoardDTO();
        dto.setBno(bno);
        dto.setBoardcontents(contents);
        System.out.println("contents"+contents);
        dao.updateBoard(dto);

    }



    @DeleteMapping(value = "/{mi_assemblename}/group/{groupno}/board")
    public int deleteBoard(
            @RequestParam(value = "bno") int bno,
            @RequestParam(value = "groupno") int groupno) {

        int del = dao.deleteBoard(bno);


        return del;
    }




}
