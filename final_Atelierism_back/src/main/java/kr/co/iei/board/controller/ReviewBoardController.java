package kr.co.iei.board.controller;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
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
@RequestMapping(value="/board/review")
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
	
	@GetMapping(value="/{reviewBoardNo}")
	public ResponseEntity<ReviewBoardDTO> selectOneBoard(@PathVariable int reviewBoardNo){
		ReviewBoardDTO board = reviewBoardService.selectOneBoard(reviewBoardNo);
		return ResponseEntity.ok(board);
	}
	
	// 게시글 삭제
	@DeleteMapping(value="/{reviewBoardNo}")
	public ResponseEntity<Integer> deleteBoard(@PathVariable int reviewBoardNo){
		ReviewBoardDTO board = reviewBoardService.deleteBoard(reviewBoardNo);
		if(board == null) {
			return ResponseEntity.ok(0);
		}else {
			if(board.getReviewBoardThumbnail() != null) {
				String savepath = root + "/review/thumbnail/";
				File delThumbnail = new File(savepath+board.getReviewBoardThumbnail());
				delThumbnail.delete();			
			}
			return ResponseEntity.ok(1);
		}
	}
	@GetMapping(value="/main")
	public ResponseEntity<List> selectReviewList(){
		List list = reviewBoardService.selectReviewList();
		return ResponseEntity.ok(list);
	}
	
}// ReviewBoardController
