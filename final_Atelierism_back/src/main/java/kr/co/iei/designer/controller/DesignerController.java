package kr.co.iei.designer.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.designer.model.dto.DesignerApplyRequestDTO;
import kr.co.iei.designer.model.dto.DesignerChartDTO;
import kr.co.iei.designer.model.dto.DesignerDetailDTO;

import kr.co.iei.designer.model.dto.DesignerStatusDetailDTO;
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
	
	@Value("${file.root}")
	private String root;
	
	@GetMapping
	public ResponseEntity<MemberDesignerDTO> selectDesignerList(){
		MemberDesignerDTO list = new MemberDesignerDTO();
		List designerList = designerService.selectAllDesigner();
		List memberList = memberService.searchDesignerId(designerList);
		list.setDesignerList(designerList);
		list.setMemberList(memberList);
		
		return ResponseEntity.ok(list);
	}
	
	@PostMapping(value="/apply")
    public ResponseEntity<Integer> applyDesigner(@RequestBody DesignerApplyRequestDTO requestData) {
        System.out.println(requestData);
		int result = designerService.applyDesigner(
            requestData.getDesignerInfo(),
            requestData.getCareerList(),
            requestData.getAwardList()
        );
        return ResponseEntity.ok(result);
    }
	
	@GetMapping(value="/list")
	public ResponseEntity<Map> selectList(@RequestParam int reqPage, @RequestParam(required = false, defaultValue = "") String loginMemberId){
		Map map = designerService.selectDesignerList(reqPage, loginMemberId);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value="/detail/{memberId}")
    public ResponseEntity<DesignerDetailDTO> selectOneDesigner(@PathVariable String memberId) {
        DesignerDetailDTO designer = designerService.selectOneDesigner(memberId);
        return ResponseEntity.ok(designer);
    }
	
	@GetMapping(value="/board")
	public ResponseEntity<List> selectDesignerBoard(){
		List list = designerService.selectDesignerBoard();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value="/profile/{filename}")
    public ResponseEntity<Resource> getProfileImage(@PathVariable String filename) throws IOException {
        String path = root + "/memberProfile/" + filename;
        File file = new File(path);
        
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }
        Resource resource = new InputStreamResource(new FileInputStream(file));
        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE); 
        return ResponseEntity.ok().headers(header).body(resource);
	}
	
	@GetMapping(value="/status/{designerId}")
    public ResponseEntity<Map> selectStatusList(@PathVariable String designerId, @RequestParam int reqPage, @RequestParam(required = false) String keyword) {
        Map map = designerService.selectStatusList(designerId, reqPage, keyword);
        return ResponseEntity.ok(map);
    }
	
	@GetMapping(value="/status/detail/{interiorNo}")
    public ResponseEntity<DesignerStatusDetailDTO> selectStatusDetail(@PathVariable int interiorNo) {
        DesignerStatusDetailDTO detail = designerService.selectStatusDetail(interiorNo);
        return ResponseEntity.ok(detail);
    }
	
	@PostMapping(value="/status/detail/update") 
    public ResponseEntity<Integer> updateStatus(@RequestBody Map<String, Object> payload) {
        int interiorNo = (Integer) payload.get("interiorNo");
        String interiorMemo = (String) payload.get("interiorMemo");
        int interiorStatus = (Integer) payload.get("interiorStatus");

        int result = designerService.updateStatus(interiorNo, interiorMemo, interiorStatus);
        return ResponseEntity.ok(result);
    }
	@GetMapping(value="/{designerId}")
	public ResponseEntity<String> serarchDesignerLink(@PathVariable String designerId){
		String designerLink = designerService.searchDesignerLink(designerId);
		
		return ResponseEntity.ok(designerLink);
	}
	
	@PostMapping(value="/info/update") 
    public ResponseEntity<Integer> updateDesignerInfo(@RequestBody DesignerApplyRequestDTO requestData) {
        int result = designerService.updateDesignerInfo(
            requestData.getDesignerInfo(),
            requestData.getCareerList(),
            requestData.getAwardList()
        );
        return ResponseEntity.ok(result);
    }
	
	@GetMapping("/chart/{designerId}")
    public ResponseEntity<List<DesignerChartDTO>> selectChartData(@PathVariable String designerId) {
        List<DesignerChartDTO> chartData = designerService.selectChartData(designerId);
        return ResponseEntity.ok(chartData);
    }
}
