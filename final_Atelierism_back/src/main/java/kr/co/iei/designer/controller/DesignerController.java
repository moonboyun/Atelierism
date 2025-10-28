package kr.co.iei.designer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.designer.model.dto.AwardsCareerDTO;
import kr.co.iei.designer.model.dto.CareerDetailDTO;
import kr.co.iei.designer.model.dto.DesignerApplyRequestDTO;
import kr.co.iei.designer.model.dto.DesignerDTO;
import kr.co.iei.designer.model.dto.DesignerDetailDTO;
import kr.co.iei.designer.model.dto.DesignerIntroDTO;
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
	
	@PostMapping("/apply")
    public ResponseEntity<Integer> applyDesigner(@RequestBody DesignerApplyRequestDTO requestData) {
        int result = designerService.applyDesigner(
            requestData.getDesignerInfo(),
            requestData.getCareerList(),
            requestData.getAwardList()
        );

        return ResponseEntity.ok(result);
    }
	
	@GetMapping(value="/list")
	public ResponseEntity<Map> selectList(@RequestParam int reqPage){
		Map map = designerService.selectAllDesigner(reqPage);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping("/detail/{memberId}")
    public ResponseEntity<DesignerDetailDTO> selectOneDesigner(@PathVariable String memberId) {
        DesignerDetailDTO designer = designerService.selectOneDesigner(memberId);
        return ResponseEntity.ok(designer);
    }
	
	@GetMapping(value="/board")
	public ResponseEntity<List> selectDesignerBoard(){
		List list = designerService.selectDesignerBoard();
		return ResponseEntity.ok(list);
	}

	
}
