package kr.co.iei.board.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.board.model.service.DesignerBoardService;
import kr.co.iei.util.FileUtil;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/board/designer")
public class DesignerBoardController {
	@Autowired
	private DesignerBoardService designerBoardService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	@GetMapping
	public ResponseEntity<Map> designerBoardList(@RequestParam int reqPage){
		Map map = designerBoardService.selectDesignerBoardList(reqPage);
		return ResponseEntity.ok(map);
	}
	


}// DesignerBoardController
