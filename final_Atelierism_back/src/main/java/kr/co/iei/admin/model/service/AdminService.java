package kr.co.iei.admin.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dto.PriceListDto;

@Service
public class AdminService {
	
	@Autowired
	private AdminDao adminDao;

	public List priceListSelect() {
		List pl = adminDao.priceListSelect();
		return pl;
	}

}
