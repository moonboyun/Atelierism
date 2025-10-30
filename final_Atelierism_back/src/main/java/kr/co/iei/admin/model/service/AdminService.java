package kr.co.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dto.PriceListDto;
import kr.co.iei.board.model.dao.ReviewBoardDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageInfoUtils;

@Service
public class AdminService {
	
	@Autowired
	private AdminDao adminDao;
	@Autowired
	private PageInfoUtils pageInfoUtils;

	public PriceListDto priceListSelect() {
		PriceListDto pl = adminDao.priceListSelect();
		return pl;
	}

	@Transactional
	public int updatePriceList(PriceListDto priceList) {
		int result = adminDao.updatePriceList(priceList);
		return result;
	}//updatePriceList

	/*public List selectAdminList(String pageList) {
		if(pageList.equals("m1")) {
			List adminListData = adminDao.adminMemberList();
			return adminListData;
		} else if(pageList.equals("m2")) {
			List adminListData = adminDao.adminDesignerList();
			return adminListData;
		}else{
			List adminListData = adminDao.adminApplicantList();
			return adminListData;
		}
	}*/

	public Map selectBoardList(int reqPage, String memOrder) {
		int numPerPage = 10;		//한 페이지당 게시물 수
		int pageNaviSize = 5;		//페이지 네비 길이
		int totalCount = 0;
		if(memOrder.equals("m1")||memOrder.equals("m2")) {
			totalCount = adminDao.memberTotalCount();
		} else if(memOrder.equals("a1")||memOrder.equals("a2")||memOrder.equals("a3")) {
			totalCount = adminDao.applicantTotalCount(memOrder);
		} else if(memOrder.equals("d1")||memOrder.equals("d2")||memOrder.equals("d3")) {
			totalCount = adminDao.designerTotalCount(memOrder);
		}
		PageInfo pi = pageInfoUtils.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);//ok
		//pi랑 정렬기준을 둘 다 줘야하기때문에 Map이라는 객체로 묶어서 보냄
		//정렬에 필요한건 start, end, memOrder 3가지라서 이것만 묶어서 보냄
		Map<String, Object> orderMap = new HashMap<String, Object>();
		orderMap.put("start",pi.getStart());
		orderMap.put("end", pi.getEnd());
		orderMap.put("memOrder", memOrder);
		//묶은뒤 전송
		if(memOrder.equals("m1")||memOrder.equals("m2")) {
			List reqList = adminDao.selectMemberList(orderMap);
			//select 성공하면 다른 map으로 묶어서 전송해줌
			Map<String, Object> map = new HashMap<String,Object>();
			map.put("reqList", reqList);
			map.put("pi", pi);
			return map;
		}else if(memOrder.equals("a1")||memOrder.equals("a2")||memOrder.equals("a3")) {
			List reqList = adminDao.selectApplicantList(orderMap);
			//select 성공하면 다른 map으로 묶어서 전송해줌
			Map<String, Object> map = new HashMap<String,Object>();
			map.put("reqList", reqList);
			map.put("pi", pi);
			return map;
		}else {
			List reqList = adminDao.selectDesignerList(orderMap);
			Map<String, Object> map = new HashMap<String,Object>();
			map.put("reqList", reqList);
			map.put("pi", pi);
			return map;
		}
	}//selectBoardList

	
	public Map selectApplicantDetailList(String memberId) {
		List applicantDetail = adminDao.selectApplicantDetail(memberId);
		List applicantAward = adminDao.selectApplicantAward(memberId);
		List applicantCareer = adminDao.selectApplicantCareer(memberId);
		Map<String, Object> detail = new HashMap<String, Object>();
		detail.put("applicantDetail", applicantDetail);
		detail.put("applicantAward", applicantAward);
		detail.put("applicantCareer", applicantCareer);
		return detail;
	}
	
	@Transactional
	public int refusalDesigner(String memberId) {
		int result = adminDao.refusalDesigner(memberId);
		return result;
	}

	@Transactional
	public int enterDesigner(String memberId) {
		int result = adminDao.enterDesigner(memberId);
		return result;
	}

	public Map myPageList(Map<String, Object> month) {
		Map<String, Object> myPageList = new HashMap<String, Object>();
		List applicantList = adminDao.applicantList();//신청자리스트
		List topDesignerList = adminDao.topDesigner(month);//이달의 디자이너 top5
		
		myPageList.put("applicantList", applicantList);
		myPageList.put("topDesignerList", topDesignerList);
		return myPageList;
	}

}
