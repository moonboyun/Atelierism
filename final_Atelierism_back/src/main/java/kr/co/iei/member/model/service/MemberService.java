package kr.co.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;

	public MemberDTO selectOneMember(String memberId) {
		MemberDTO member = memberDao.selectOneMember(memberId);
		member.setMemberPw(null);
		return member;
	}

	public MemberDTO login(MemberDTO member) {
		MemberDTO m = memberDao.selectOneMember(member);
		//LoginMemberDTO loginMember = new LoginMemberDTO(m.getMemberId(), m.getMemberType());
		return m;
	}
}
