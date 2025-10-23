package kr.co.iei.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.board.model.dao.ReviewBoardDao;
import kr.co.iei.board.model.dto.ReviewBoardDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageInfoUtils;

@Service
public class ReviewBoardService {
	@Autowired
	private ReviewBoardDao reviewBoardDao;
	@Autowired
	private PageInfoUtils pageInfoUtil;
	

	@Transactional
	public int insertBoard(ReviewBoardDTO board) {
		int reviewBoardNo = reviewBoardDao.getReviewBoardNo();
		board.setReviewBoardNo(reviewBoardNo);
		int result = reviewBoardDao.insertBoard(board);
		return result;
	}

	public Map selectBoardList(int reqPage) {
		int numPerPage = 12;		//한 페이지당 게시물 수
		int pageNaviSize = 5;		//페이지 네비 길이
		int totalCount = reviewBoardDao.totalCount();
		PageInfo pi = pageInfoUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List boardList = reviewBoardDao.selectBoardList(pi);
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("boardList", boardList);
		map.put("pi", pi);
		return map;
	}

	
	public ReviewBoardDTO selectOneBoard(int reviewBoardNo) {
		ReviewBoardDTO board = reviewBoardDao.selectOneBoard(reviewBoardNo);
		return board;
	}
	
	@Transactional
	public ReviewBoardDTO deleteBoard(int reviewBoardNo) {
		ReviewBoardDTO board = reviewBoardDao.selectOneBoard(reviewBoardNo);
		int result = reviewBoardDao.deleteBoard(reviewBoardNo);
		if(result > 0) {
			return board;
		}else {			
			return null;
		}
	}

	
}// ReviewBoardService
