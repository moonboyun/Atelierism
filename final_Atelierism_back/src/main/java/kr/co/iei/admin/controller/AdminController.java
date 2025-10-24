package kr.co.iei.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.admin.model.dto.PriceListDto;
import kr.co.iei.admin.model.service.AdminService;
import kr.co.iei.board.model.service.ReviewBoardService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	@Autowired
	private ReviewBoardService rbService;
	
	@GetMapping(value = "/list")
	public ResponseEntity<PriceListDto> selectPriceList() {
		PriceListDto  pl = adminService.priceListSelect();
		return ResponseEntity.ok(pl);
	}
	
	@PatchMapping
	public ResponseEntity<Integer> updatePriceList(@RequestBody PriceListDto priceList){
		int result = adminService.updatePriceList(priceList);
		return ResponseEntity.ok(result);
	}
	
	/*@GetMapping(value = "adminList")//제일 처음 리스트 들고 올 코드//일단은 안 씀
	public ResponseEntity<List> selectAdminList(@RequestParam String pageList){
		List adminListData = adminService.selectAdminList(pageList);
		return ResponseEntity.ok(adminListData);
	}*/
	
	
	@GetMapping
	public ResponseEntity<Map> adminList(@RequestParam int reqPage, @RequestParam String memOrder){
		Map map = adminService.selectBoardList(reqPage, memOrder);
		System.out.println(map);
		return ResponseEntity.ok(map);
	}
}
