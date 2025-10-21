package kr.co.iei.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.admin.model.dto.PriceListDto;
import kr.co.iei.admin.model.service.AdminService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	@GetMapping(value = "/list")
	public ResponseEntity<PriceListDto> selectPriceList() {
		PriceListDto  pl = adminService.priceListSelect();
		return ResponseEntity.ok(pl);
	}
	
	@PatchMapping
	public ResponseEntity<Integer> updatePriceList(@RequestBody PriceListDto priceList){
		int result = adminService.updatePriceList(priceList);
		System.out.println(result);
		return ResponseEntity.ok(result);
	}
}
