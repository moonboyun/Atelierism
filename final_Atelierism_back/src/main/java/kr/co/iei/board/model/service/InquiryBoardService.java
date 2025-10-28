package kr.co.iei.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.board.model.dao.InquiryBoardDao;
import kr.co.iei.board.model.dto.InquiryBoardDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageInfoUtils;

@Service
public class InquiryBoardService {
	@Autowired
	private InquiryBoardDao inquiryBoardDao;
	@Autowired
	private PageInfoUtils pageInfoUtils;
	
	
	public Map selectBoardList(int reqPage) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = inquiryBoardDao.totalCount();
		PageInfo pi = pageInfoUtils.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List inquiryList = inquiryBoardDao.selectBoardList(pi);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("inquiryList", inquiryList);
		map.put("pi", pi);
		return map;
	}
	
	
	@Transactional
	public int insertBoard(InquiryBoardDTO board) {
		int inquiryBoardNo = inquiryBoardDao.getInquiryBoardNo();
		board.setInquiryBoardNo(inquiryBoardNo);
	    if (board.getInquiryBoardStatus() == 0) {
	        board.setInquiryBoardStatus(1); // 기본: 답변 대기
	    }
		int result = inquiryBoardDao.insertBoard(board);
		return result;
	}


	@Transactional
	public int updateAdminComment(InquiryBoardDTO comment) {
		int result = inquiryBoardDao.updateAdminComment(comment);
		return result;
	}


	public InquiryBoardDTO selectOneBoard(int inquiryBoardNo) {
		InquiryBoardDTO view = inquiryBoardDao.selectOneBoard(inquiryBoardNo);
		return view;
	}
	
	
}// InquiryBoardService
