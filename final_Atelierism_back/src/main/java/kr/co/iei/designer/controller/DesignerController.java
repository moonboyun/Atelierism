package kr.co.iei.designer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.designer.model.dto.DesignerDTO;
import kr.co.iei.designer.model.dto.MemberDesignerDTO;
import kr.co.iei.designer.model.service.DesignerService;
import kr.co.iei.member.model.service.MemberService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/designer")
public class DesignerController {
	
	@Autowired
	private DesignerService designerService;
	
	@Autowired
	private MemberService memberService;
	
	@GetMapping
	public ResponseEntity<MemberDesignerDTO> selectDesignerList(){
		MemberDesignerDTO list = new MemberDesignerDTO();
		List designerList = designerService.selectAllDesigner();
		List memberList = memberService.searchDesignerId(designerList);
		list.setDesignerList(designerList);
		list.setMemberList(memberList);
		
		return ResponseEntity.ok(list);
	}
	
}
