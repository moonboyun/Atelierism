package kr.co.iei.interior.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.admin.model.dto.PriceListDto;
import kr.co.iei.admin.model.service.AdminService;
import kr.co.iei.interior.model.dto.InteriorDTO;
import kr.co.iei.interior.model.service.InteriorService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/interior")
public class InteriorController {
	
	@Autowired
	private InteriorService interiorService;
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping
	public ResponseEntity<PriceListDto> selectPrice(){
		PriceListDto price = adminService.priceListSelect();
		return ResponseEntity.ok(price);
	}
	@GetMapping(value="/{memberId}")
	public ResponseEntity<Integer> selectIsInterior(@PathVariable String memberId){
		int result = interiorService.selectisInterior(memberId);
		return ResponseEntity.ok(result);
	}
	@PostMapping
	public ResponseEntity<Integer> insertInterior(@RequestBody InteriorDTO interior ){
		int result = interiorService.insertInterior(interior);
		return ResponseEntity.ok(result);
	}

}
