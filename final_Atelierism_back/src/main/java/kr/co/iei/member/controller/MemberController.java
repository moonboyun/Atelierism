package kr.co.iei.member.controller;

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

import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.util.JwtUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	@Autowired
	private JwtUtils Jwt;
	@PostMapping
	public ResponseEntity<Integer> insertMember(@RequestBody MemberDTO member){
		System.out.println("컨트롤러 멤버 : "+member);
		int result = memberService.insertMember(member);
		System.out.println("컨트롤러 결과 : "+result);
		return ResponseEntity.ok(result);
	}
	@GetMapping(value="/exists")
	public ResponseEntity<Integer> exists(@RequestParam String memberId){
		int result = memberService.exists(memberId);
		return ResponseEntity.ok(result);
	}
	@PostMapping(value="/login")
	public ResponseEntity<LoginMemberDTO> login(@RequestBody MemberDTO member){
		System.out.println("컨트롤러 member : "+member);
		LoginMemberDTO m = memberService.login(member);
		System.out.println("컨트롤러 m : "+m);
		if(m != null) {			
			return ResponseEntity.ok(m);
		}else {
			return ResponseEntity.status(404).build();
		}

	}
	@GetMapping(value="/{memberId}")
	public ResponseEntity<MemberDTO> selectOneMember(@PathVariable String memberId){
		MemberDTO member = memberService.selectOneMember(memberId);
		return ResponseEntity.ok(member);
	}
	@DeleteMapping(value="/{memberId}")
	public ResponseEntity<Integer> deleteMember(@PathVariable String memberId){
		int result = memberService.deleteMember(memberId);
		return ResponseEntity.ok(result);
	}
	@PatchMapping
	public ResponseEntity<Integer> updateMember(@RequestBody MemberDTO member){
		int result = memberService.updateMember(member);
		return ResponseEntity.ok(result);
	}
	@PostMapping(value="/checkPw")
	public ResponseEntity<Integer> checkPw(@RequestBody MemberDTO member){
		System.out.println("컨트롤러 member : "+member.getMemberPw());
		int result = memberService.checkPw(member);
		System.out.println("컨트롤러 result : " + result);
		return ResponseEntity.ok(result);
	}
}
