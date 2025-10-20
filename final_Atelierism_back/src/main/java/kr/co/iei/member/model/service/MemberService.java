package kr.co.iei.member.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.designer.model.dto.DesignerDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;

	public MemberDTO selectOneMember(String memberId) {
		MemberDTO member = memberDao.selectOneMember(memberId);
		//member.setMemberPw(null);
		return member;
	}

	public MemberDTO login(MemberDTO member) {
		MemberDTO m = memberDao.selectOneMember(member.getMemberId());
		//LoginMemberDTO loginMember = new LoginMemberDTO(m.getMemberId(), m.getMemberType());
		return m;
	}

	@Transactional
	public int deleteMember(String memberId) {
		int result = memberDao.deleteMember(memberId);
		return result;
	}

	@Transactional
	public int updateMember(MemberDTO member) {
		int result = memberDao.updateMemeber(member);
		return result;
	}

	@Transactional
	public int checkPw(MemberDTO member) {
		MemberDTO m = memberDao.selectOneMember(member.getMemberId());
		if(member.getMemberPw().equals(m.getMemberPw())) {
			return 1;
		}else {
			return 0;
		}
	}

	public List searchDesignerId(List<DesignerDTO> designerList) {
		ArrayList<MemberDTO> list = new ArrayList<MemberDTO>();
		for(DesignerDTO designer : designerList) {
			String memberId = designer.getMemberId();
			MemberDTO member = memberDao.searchIdMember(memberId);
			if(member != null) {
				list.add(member);
			}
		}
		return list;
	}
}
