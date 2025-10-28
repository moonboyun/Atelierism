package kr.co.iei.board.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.board.model.dto.InquiryBoardDTO;
import kr.co.iei.board.model.service.InquiryBoardService;
import kr.co.iei.util.FileUtil;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/board/inquiry")
public class InquiryBoardController {
	@Autowired
	private InquiryBoardService inquiryBoardService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	// 게시글 등록
	@PostMapping
	public ResponseEntity<Integer> insertBoard(@ModelAttribute InquiryBoardDTO board) {
		int result = inquiryBoardService.insertBoard(board);
		return ResponseEntity.ok(result);
	}
	
	// TextEditor(Content) 이미지 등록
	@PostMapping(value="/image")
	public ResponseEntity<String> editorImageUpload(@ModelAttribute MultipartFile image){
	    String savepath = root + "/inquiry/content/";
	    String filename = fileUtil.upload(savepath, image);
	    return ResponseEntity.ok(filename);
	}
	
	// 정보 조회
	@GetMapping
	public ResponseEntity<Map> inquiryList(@RequestParam int reqPage){
		Map map = inquiryBoardService.selectBoardList(reqPage);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping("/view/{inquiryBoardNo}")
	public ResponseEntity<InquiryBoardDTO> selectOneBoard(@PathVariable int inquiryBoardNo){
	    InquiryBoardDTO view = inquiryBoardService.selectOneBoard(inquiryBoardNo);
	    return ResponseEntity.ok(view);
	}
	
	// 관리자 답변 등록
	@PostMapping(value="/view")
	public ResponseEntity<Integer> updateAdminCommnet(@ModelAttribute InquiryBoardDTO comment){
		int result = inquiryBoardService.updateAdminComment(comment);
		return ResponseEntity.ok(result);
	}
	
	
	
}// InquiryBoard Controller
