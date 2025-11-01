package kr.co.iei.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
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
import kr.co.iei.member.model.dto.MemberDTO;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	@Autowired
	private ReviewBoardService rbService;
	
	@GetMapping(value = "/list")
	public ResponseEntity<Map> selectPriceList(@RequestParam String toMonth) {
		Map<String, Object> month = new HashMap<String, Object>();
		month.put("toMonth1", toMonth);//이번달 디자이너 순위용
		month.put("toMonth2", toMonth+"-%");//이달의 가입자용
		Map salesStateList = adminService.selectSalesStateList(month);
		return ResponseEntity.ok(salesStateList);
	};
	
	@GetMapping(value = "/myPageList")
	public ResponseEntity<Map> myPageList(@RequestParam String toMonth){
		Map myPageList = adminService.myPageList(toMonth);
		return ResponseEntity.ok(myPageList);
	}
	
	@PatchMapping
	public ResponseEntity<Integer> updatePriceList(@RequestBody PriceListDto priceList){
		int result = adminService.updatePriceList(priceList);
		return ResponseEntity.ok(result);
	};
	
	@GetMapping(value="/price")
	public ResponseEntity<PriceListDto> selectPrice(){
		PriceListDto price = adminService.priceListSelect();
		return ResponseEntity.ok(price);
	}
	
	/*@GetMapping(value = "adminList")//제일 처음 리스트 들고 올 코드//일단은 안 씀
	public ResponseEntity<List> selectAdminList(@RequestParam String pageList){
		List adminListData = adminService.selectAdminList(pageList);
		return ResponseEntity.ok(adminListData);
	}*/
	
	
	@GetMapping
	public ResponseEntity<Map> adminList(@RequestParam int reqPage, @RequestParam String memOrder){
		Map map = adminService.selectBoardList(reqPage, memOrder);
		return ResponseEntity.ok(map);
	};
	
	@GetMapping(value = "/detail")
	public ResponseEntity<Map> selectApplicantDetailList(@RequestParam String memberId){
		Map detail = adminService.selectApplicantDetailList(memberId);
		return ResponseEntity.ok(detail);
	};
	
	@PatchMapping(value = "/refusal")
	public ResponseEntity<Integer> refusalDesigner(@RequestParam String memberId){
		int result = adminService.refusalDesigner(memberId);
		return ResponseEntity.ok(result);
	}
	
	@PatchMapping(value = "/enter")
	public ResponseEntity<Integer> enterDesigner(@RequestParam String memberId){
		int result = adminService.enterDesigner(memberId);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "/chart")
	public ResponseEntity<List> chartSelect(@RequestParam int chartOrder){
		List chartData = adminService.chartSelect(chartOrder);
		System.out.println(chartData);
		return ResponseEntity.ok(chartData);
	}
}
