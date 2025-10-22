package kr.co.iei.interior.model.service;

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
}
