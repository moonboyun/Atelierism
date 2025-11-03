package kr.co.iei.member.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.interior.model.dto.InteriorDTO;
import kr.co.iei.interior.model.service.InteriorService;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.util.EmailSender;
import kr.co.iei.util.FileUtil;
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
	@Autowired
	private InteriorService interiorService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	@PostMapping
	public ResponseEntity<Integer> insertMember(@RequestBody MemberDTO member){
		int result = memberService.insertMember(member);
		return ResponseEntity.ok(result);
	}
	@GetMapping(value="/exists")
	public ResponseEntity<Integer> exists(@RequestParam String memberId){
		int result = memberService.exists(memberId);
		return ResponseEntity.ok(result);
	}
	@PostMapping(value="/login")
	public ResponseEntity<LoginMemberDTO> login(@RequestBody MemberDTO member){
		LoginMemberDTO m = memberService.login(member);
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
		int result = memberService.checkPw(member);
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
		//인증코드 생성
		Random r = new Random();
		StringBuffer sb = new StringBuffer();
		for(int i=0;i<6;i++) {
			//대문자 : r.nextInt(26)+65
			//소문자: r.nextInt(26)+97
			//숫자: r.nextInt(10)
			int flag = r.nextInt(3); //0:숫자, 1:대문자, 2:소문자
			if(flag==0) {
				int randomCode = r.nextInt(10);
				sb.append(randomCode);
			}else if(flag==1) {
				char randomCode = (char)(r.nextInt(26)+65);
				sb.append(randomCode);
			}else if(flag==2) {
				char randomCode = (char)(r.nextInt(26)+97);
				sb.append(randomCode);
			}
		}//for
		String emailContent = "안녕하세요 Atelierism입니다.";
		emailContent += "인증번호는 [";
		
		emailContent += sb.toString();

		emailContent += "]입니다";
		mailSender.sendMail(emailTitle, memberEmail, emailContent);
		return sb.toString();
	}//sendCode
	
	@PostMapping(value="/findId")
	public ResponseEntity<String> recoverId(@RequestBody MemberDTO member){
		String foundId = memberService.recoverId(member);
		if(foundId != null) {
			return ResponseEntity.ok(foundId);
		}else {
			return ResponseEntity.ok("");
		}
	}
	
	@PatchMapping(value="/resetPw")
	public ResponseEntity<Integer> resetPw(@RequestBody MemberDTO member) {
	    int result = memberService.resetPw(member);
	    return ResponseEntity.ok(result);
	}
	@GetMapping("/payments/{memberId}")
	public ResponseEntity<List<InteriorDTO>> getPayments(@PathVariable String memberId) {
	    List<InteriorDTO> list = interiorService.selectPaymentsByMemberId(memberId);
	    return ResponseEntity.ok(list);
	}
	
	@PostMapping(value="/profile/{memberId}")
	public ResponseEntity<String> uploadProfile(
	        @PathVariable String memberId,
	        @RequestParam("file") MultipartFile file) {

	    // 저장 경로
	    String savePath = root + "/memberProfile/";
	    File folder = new File(savePath);
	    if (!folder.exists()) folder.mkdirs(); // 디렉토리 없으면 생성

	    // 파일 저장
	    String filename = fileUtil.upload(savePath, file);

	    // DB에 파일명 업데이트
	    memberService.updateProfile(memberId, filename);

	    return ResponseEntity.ok(filename);
	}


}
