package kr.co.iei.interior.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/interior")
public class InteriorController {
	
	@Autowired
	private InteriorService interiorService;
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private MemberService memberService;
	
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
	@PostMapping(value="/{memberId}")
	public ResponseEntity<Map> selectInterior(@PathVariable String memberId){
		InteriorDTO interior = interiorService.selectInterior(memberId);
		MemberDTO member = memberService.selectOneMember(memberId);
		PriceListDto price = adminService.priceListSelect();
		Map memberInfo = new HashMap<String, Object>();
		memberInfo.put("interior", interior);
		memberInfo.put("member", member);
		memberInfo.put("price", price);
		return ResponseEntity.ok(memberInfo);
	}
	@DeleteMapping(value="/{interiorNo}")
	public ResponseEntity<Integer> deleteInterior(@PathVariable int interiorNo){
		int result = interiorService.deleteInterior(interiorNo);
		return ResponseEntity.ok(result);
	}
	@PatchMapping
	public ResponseEntity<Integer> updateInterior(@RequestBody InteriorDTO interior){
		int result = interiorService.updateInterior(interior);
		return ResponseEntity.ok(result);
	}
	@PatchMapping(value="/pay")
	public ResponseEntity<Integer> payUpdate(@RequestBody InteriorDTO interior){
		int result = interiorService.payUpdateInterior(interior);
		return ResponseEntity.ok(result);
	}

}
