package kr.co.iei.interior.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.interior.model.dao.InteriorDao;

@Service
public class InteriorService {
	
	@Autowired
	private InteriorDao interiorDao;
}
