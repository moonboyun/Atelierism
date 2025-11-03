package kr.co.iei.board.model.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import kr.co.iei.board.model.dao.DesignerBoardDao;
import kr.co.iei.board.model.dto.DesignerBoardDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageInfoUtils;

@Service
public class DesignerBoardService {
    @Autowired
    private DesignerBoardDao designerBoardDao;
    @Autowired
    private PageInfoUtils pageInfoUtil;

    public Map selectDesignerBoardList(int reqPage) {
        int numPerPage = 5;
        int pageNaviSize = 5;
        int totalCount = designerBoardDao.totalCount();
        PageInfo pi = pageInfoUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
        List<DesignerBoardDTO> list = designerBoardDao.selectDesignerBoardList(pi);
        Map<String, Object> map = new HashMap<>();
        map.put("designerBoardList", list);
        map.put("pi", pi);
        return map;
    }

    @Transactional
	public int insertBoard(DesignerBoardDTO board) {
		int designerReviewNo = designerBoardDao.getDesignerReviewNo();
		board.setDesignerReviewNo(designerReviewNo);
		int result = designerBoardDao.insertBoard(board);
		return result;
	}

	public DesignerBoardDTO selectOneBoard(int designerReviewNo) {
		DesignerBoardDTO board = designerBoardDao.selectOneBoard(designerReviewNo);
		return board;
	}

	@Transactional
	public DesignerBoardDTO deleteBoard(int designerReviewNo) {
		DesignerBoardDTO board = designerBoardDao.selectOneBoard(designerReviewNo);
		int result = designerBoardDao.deleteBoard(designerReviewNo);
		if(result > 0) {
			return board;
		}else {
			return null;
		}
	}

}
