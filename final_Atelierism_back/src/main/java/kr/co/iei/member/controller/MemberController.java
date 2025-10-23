package kr.co.iei.member.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.util.EmailSender;
import kr.co.iei.util.JwtUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	@Autowired
	private JwtUtils Jwt;
	@Autowired
	private EmailSender mailSender;
	
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
	
	@GetMapping(value="/refresh")
	public ResponseEntity<LoginMemberDTO> refresh(@RequestHeader("Authorization") String token){
		LoginMemberDTO loginMember = Jwt.checkToken(token);
		String accessToken = Jwt.createAccessToken(loginMember.getMemberId(), loginMember.getMemberType());
		String refreshToken = Jwt.createRefreshToken(loginMember.getMemberId(), loginMember.getMemberType());
		loginMember.setAccessToken(accessToken);
		loginMember.setRefreshToken(refreshToken);
		return ResponseEntity.ok(loginMember);
	}
	
	@GetMapping(value="/sendCode")
	@ResponseBody
	public String sendCode(@RequestParam String memberEmail) {
		//인증 메일용 제목 생성
		String emailTitle = "Atelierism 인증메일입니다.";
		System.out.println(emailTitle);
		//인증코드 생성
		Random r = new Random();
		StringBuffer sb = new StringBuffer();
		for(int i=0;i<6;i++) {
			//대문자 : r.nextInt(26)+65
			//소문자: r.nextInt(26)+97
			//숫자: r.nextInt(10)
			int flag = r.nextInt(3); //0:숫자, 1:대문자, 2:소문자
			System.out.println(flag);
			System.out.println(r);
			if(flag==0) {
				int randomCode = r.nextInt(10);
				sb.append(randomCode);
				System.out.println(sb);
				System.out.println(randomCode);
			}else if(flag==1) {
				char randomCode = (char)(r.nextInt(26)+65);
				sb.append(randomCode);
				System.out.println(sb);
				System.out.println(randomCode);
			}else if(flag==2) {
				char randomCode = (char)(r.nextInt(26)+97);
				sb.append(randomCode);
				System.out.println(sb);
				System.out.println(randomCode);
			}
		}//for
		String emailContent = "안녕하세요 Atelierism입니다.";
		emailContent += "인증번호는 [";
		
		emailContent += sb.toString();

		emailContent += "]입니다";
		mailSender.sendMail(emailTitle, memberEmail, emailContent);
		System.out.println(emailTitle);
		System.out.println(memberEmail);
		System.out.println(emailContent);
		return sb.toString();
	}//sendCode
}
