package kr.co.iei.board.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.board.model.service.InquiryBoardService;

@RestController
@RequestMapping(value="/board/inquiry")
public class InquiryBoardController {
	@Autowired
	private InquiryBoardService inquiryBoardService; 
	
	@GetMapping
	public ResponseEntity<Map> boardList(@RequestParam int reqPage){
		Map map = inquiryBoardService.selectBoardList(reqPage);
		return ResponseEntity.ok(map);
	}
	
}// Controller
