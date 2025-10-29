package kr.co.iei.member.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.FinalAtelierismBackApplication;
import kr.co.iei.designer.model.dto.DesignerDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.JwtUtils;

@Service
public class MemberService {
	private final FinalAtelierismBackApplication finalAtelierismBackApplication;
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private BCryptPasswordEncoder encoder;
	@Autowired
	private JwtUtils jwtUtil;
	
	MemberService(FinalAtelierismBackApplication finalAtelierismBackApplication) {
        this.finalAtelierismBackApplication = finalAtelierismBackApplication;
    }

	public MemberDTO selectOneMember(String memberId) {
		MemberDTO member = memberDao.selectOneMember(memberId);
		//member.setMemberPw(null);
		return member;
	}

	public LoginMemberDTO login(MemberDTO member) {
		MemberDTO m = memberDao.selectOneMember(member.getMemberId());
		if(m != null) {
			if(encoder.matches(member.getMemberPw(), m.getMemberPw())) {				
				String accessToken = jwtUtil.createAccessToken(m.getMemberId(), m.getMemberType());
				String refreshToken = jwtUtil.createRefreshToken(m.getMemberId(), m.getMemberType());
				LoginMemberDTO loginMember = new LoginMemberDTO(accessToken, refreshToken, m.getMemberId(), m.getMemberType());
				return loginMember;
			}else {
				return null;
			}
		}
		return null;
	}

	@Transactional
	public int deleteMember(String memberId) {
		int result = memberDao.deleteMember(memberId);
		return result;
	}

	@Transactional
	public int updateMember(MemberDTO member) {
	    if (member.getMemberPw() != null && !member.getMemberPw().isEmpty()) {
	        String encPw = encoder.encode(member.getMemberPw());
	        member.setMemberPw(encPw);
	    }
	    int result = memberDao.updateMember(member);
	    return result;
	}

	@Transactional
	public int checkPw(MemberDTO member) {
		MemberDTO m = memberDao.selectOneMember(member.getMemberId());
		if(encoder.matches(member.getMemberPw(), (m.getMemberPw()))) {
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

	public int exists(String memberId) {
		int result = memberDao.exists(memberId);
		return result;
	}

	@Transactional
	public int insertMember(MemberDTO member) {
		String memberPw = member.getMemberPw();
		String encPw = encoder.encode(memberPw);
		member.setMemberPw(encPw);
		int result = memberDao.insertMember(member);
		return result;
	}

	public String recoverId(MemberDTO member) {
		String foundId =  memberDao.recoverId(member);
		return foundId;
	}

	@Transactional
	public int resetPw(MemberDTO member) {
	    if (member.getMemberId() == null || member.getMemberId().isEmpty()) {
	        return 0;
	    }
	    if (member.getMemberPw() == null || member.getMemberPw().isEmpty()) {
	        return 0;
	    }

	    String encPw = encoder.encode(member.getMemberPw());
	    member.setMemberPw(encPw);

	    int result = memberDao.updatePassword(member);
	    return result;
	}

	@Transactional
	public int updateProfile(String memberId, String filename) {
	    MemberDTO member = new MemberDTO();
	    member.setMemberId(memberId);
	    member.setMemberThumb(filename);
	    
	    return memberDao.updateProfile(member);
	}
	
}
