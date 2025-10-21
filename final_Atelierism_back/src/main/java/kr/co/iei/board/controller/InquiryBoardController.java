package kr.co.iei.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kr.co.iei.board.model.service.InquiryBoardService;

@RestController
@RequestMapping(value="/board/inquiry")
public class InquiryBoardController {
	@Autowired
	private InquiryBoardService inquiryBoardService; 
}// Controller
