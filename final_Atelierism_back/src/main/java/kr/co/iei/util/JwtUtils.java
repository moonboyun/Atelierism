package kr.co.iei.util;

import java.util.Calendar;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import kr.co.iei.member.model.dto.LoginMemberDTO;

@Component
public class JwtUtils {

	@Value("${jwt.secret-key}")
	private String secretKey;
	@Value("${jwt.expire-hour}")
	private int expireHour;
	@Value("${jwt.expire-hour-refresh}")
	private int expireHourRefresh;
	
	public String createAccessToken (String memberId, int memberType) {
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		
		Calendar c= Calendar.getInstance();
		
		Date startTime = c.getTime();
		c.add(Calendar.HOUR, expireHourRefresh);
		Date expireTime = c.getTime();
		
		String token = Jwts.builder()
				.issuedAt(startTime)
				.expiration(expireTime)
				.signWith(key)
				.claim("memberId", memberId)
				.claim("memberType", memberType)
				.compact();
		return token;
	}
	
	public String createRefreshToken (String memberId, int memberType) {
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		
		Calendar c= Calendar.getInstance();
		
		Date startTime = c.getTime();
		c.add(Calendar.HOUR, expireHourRefresh);
		Date expireTime = c.getTime();
		
		String token = Jwts.builder()
				.issuedAt(startTime)
				.expiration(expireTime)
				.signWith(key)
				.claim("memberId", memberId)
				.claim("memberType", memberType)
				.compact();
		return token;
	}
	
	public LoginMemberDTO checkToken(String token) {
		//1. 작성해둔 키값을 이용해서 암호화코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		
		Claims claims = (Claims)Jwts.parser()
							.verifyWith(key)
							.build()
							.parse(token)
							.getPayload();
		String memberId = (String)claims.get("memberId");
		int memberType = (int)claims.get("memberType");
		LoginMemberDTO loginMember = new LoginMemberDTO();
		loginMember.setMemberId(memberId);
		loginMember.setMemberType(memberType);
		return loginMember;
	}
}
