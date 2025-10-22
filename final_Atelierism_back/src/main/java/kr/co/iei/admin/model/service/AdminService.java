package kr.co.iei.admin.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dto.PriceListDto;

@Service
public class AdminService {
	
	@Autowired
	private AdminDao adminDao;

	public PriceListDto priceListSelect() {
		PriceListDto pl = adminDao.priceListSelect();
		return pl;
	}

	@Transactional
	public int updatePriceList(PriceListDto priceList) {
		int result = adminDao.updatePriceList(priceList);
		return result;
	}

	public List selectAdminList(int pageList) {
		if(pageList == 1) {
			List adminListData = adminDao.adminMemberList();
			return adminListData;
		} else if(pageList == 2) {
			List adminListData = adminDao.adminDesignerList();
			return adminListData;
		}else{
			List adminListData = adminDao.adminApplicantList();
			return adminListData;
		}
	}

}
