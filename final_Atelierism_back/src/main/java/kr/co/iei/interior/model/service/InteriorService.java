package kr.co.iei.interior.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.interior.model.dao.InteriorDao;
import kr.co.iei.interior.model.dto.InteriorDTO;

@Service
public class InteriorService {
	
	@Autowired
	private InteriorDao interiorDao;
	
	@Transactional
	public int insertInterior(InteriorDTO interior) {
		int result = interiorDao.insertInterior(interior);
		return result;
	}

	public int selectisInterior(String memberId) {
		int result = interiorDao.selectIsInterior(memberId);
		return result;
	}

	public InteriorDTO selectInterior(String memberId) {
		InteriorDTO interior = interiorDao.selectInterior(memberId);
		return interior;
	}
	
	@Transactional
	public int deleteInterior(int interiorNo) {
		int result = interiorDao.deleteInterior(interiorNo);
		return result;
	}

	@Transactional
	public int updateInterior(InteriorDTO interior) {
		int result = interiorDao.updateInterior(interior);
		return result;
	}
	public List<InteriorDTO> selectPaymentsByMemberId(String memberId) {
		List<InteriorDTO> list = interiorDao.selectPaymentsByMemberId(memberId);
		return list;
	}
	@Transactional
	public int payUpdateInterior(InteriorDTO interior) {
		int result = interiorDao.payUpdateInterior(interior);
		return result;
	}
}
