package kr.co.assemble.controller;





import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;




@Controller
@SpringBootApplication
public class AI_controller {
	
	
	private final String MAIN = "main";
	
	
	
	//메인화면 출력
	@GetMapping("/main")
	public String list(Model model) {
		


		return MAIN;
	}
	
	
	
	
	
	
}
