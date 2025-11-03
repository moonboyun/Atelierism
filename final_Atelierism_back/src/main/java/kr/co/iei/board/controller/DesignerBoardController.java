package kr.co.iei.board.controller;

import java.io.File;
import java.util.Map;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import kr.co.iei.board.model.dto.DesignerBoardDTO;
import kr.co.iei.board.model.service.DesignerBoardService;
import kr.co.iei.util.FileUtil;

@CrossOrigin("*")
@RestController
@RequestMapping("/board/designer")
public class DesignerBoardController {

    @Autowired
    private DesignerBoardService designerBoardService;
    @Autowired
    private FileUtil fileUtil;

    @Value("${file.root}")
    private String root;

    // 목록(페이징)
    @GetMapping
    public ResponseEntity<Map> designerBoardList(@RequestParam int reqPage) {
        Map map = designerBoardService.selectDesignerBoardList(reqPage);
        return ResponseEntity.ok(map);
    }
    
    @PostMapping
    public ResponseEntity<Integer> insertBoard(@ModelAttribute DesignerBoardDTO board, @ModelAttribute MultipartFile before, @ModelAttribute MultipartFile after){
    	if (before != null && !before.isEmpty()) {
    	    String savepathB = root + "/designerReview/before/";
    	    String filenameB = fileUtil.upload(savepathB, before);
    	    board.setBeforeImg(filenameB);
    	}
    	if (after != null && !after.isEmpty()) {
    	    String savepathA = root + "/designerReview/after/";
    	    String filenameA = fileUtil.upload(savepathA, after);
    	    board.setAfterImg(filenameA);
    	}
    	int result = designerBoardService.insertBoard(board);
    	return ResponseEntity.ok(result);
    }
    
    @PostMapping(value="/image")
    public ResponseEntity<String> editorImageUpload(@ModelAttribute MultipartFile image){
    	String savepath = root + "/designerReview/content/";
    	String filename = fileUtil.upload(savepath, image);
    	return ResponseEntity.ok(filename);
    }
    
    @GetMapping(value="/view/{designerReviewNo}")
    public ResponseEntity<DesignerBoardDTO> selectOneBoard(@PathVariable int designerReviewNo){
    	DesignerBoardDTO board = designerBoardService.selectOneBoard(designerReviewNo);
    	return ResponseEntity.ok(board);
    }
    
	@DeleteMapping(value="/{designerReviewNo}")
	public ResponseEntity<Integer> deleteBoard(@PathVariable int designerReviewNo){
		DesignerBoardDTO board = designerBoardService.deleteBoard(designerReviewNo);
		if(board == null) {
			return ResponseEntity.ok(0);
		}else {
			if(board.getAfterImg() != null) {
				String savepathA = root + "/designerReview/after/";
				File delAfter = new File(savepathA+board.getAfterImg());
				delAfter.delete();			
			}
			if(board.getBeforeImg() != null) {
				String savepathB = root + "/designerReview/before/";
				File delBefore = new File(savepathB+board.getBeforeImg());
				delBefore.delete();
			}
			return ResponseEntity.ok(1);
		}
	}

   
}
