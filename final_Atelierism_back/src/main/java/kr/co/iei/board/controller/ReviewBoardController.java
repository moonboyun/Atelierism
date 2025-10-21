package kr.co.iei.board.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import kr.co.iei.board.model.dto.ReviewBoardDTO;
import kr.co.iei.board.model.service.ReviewBoardService;
import kr.co.iei.util.FileUtil;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/board")
public class ReviewBoardController {
	@Autowired
	private ReviewBoardService reviewBoardService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	@GetMapping
	public ResponseEntity<Map> boardList(@RequestParam int reqPage){
		Map map = reviewBoardService.selectBoardList(reqPage);
		return ResponseEntity.ok(map);
	}
	
	
	@PostMapping
	public ResponseEntity<Integer> insertBoard(@ModelAttribute ReviewBoardDTO board,
	                                           @ModelAttribute MultipartFile thumbnail){
	    if(thumbnail != null && !thumbnail.isEmpty()){
	        String savepath = root + "/review/thumbnail/";
	        String filename = fileUtil.upload(savepath, thumbnail);
	        board.setReviewBoardThumbnail(filename);                
	    }
	    int result = reviewBoardService.insertBoard(board);
	    return ResponseEntity.ok(result);
	}
	
	@PostMapping(value="/image")
	public ResponseEntity<String> editorImageUpload(@ModelAttribute MultipartFile image){
	    String savepath = root + "/review/content/";
	    String filename = fileUtil.upload(savepath, image);
	    return ResponseEntity.ok(filename);
	}
	
}// ReviewBoardController
