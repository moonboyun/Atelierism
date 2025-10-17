package kr.co.iei.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.board.model.dao.InquiryBoardDao;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageInfoUtils;

@Service
public class InquiryBoardService {
	@Autowired
	private InquiryBoardDao inquiryBoardDao;
	@Autowired
	private PageInfoUtils pageInfoUtils;

	public Map selectBoardList(int reqPage) {
		int numPerPage = 9;
		int pageNaviSize = 5;
		int totalCount = inquiryBoardDao.totalCount();
		PageInfo pi = pageInfoUtils.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List boardList = inquiryBoardDao.selectBoardList(pi);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		map.put("pi", pi);
		return map;
	}
	
	
}// InquiryBoardService
