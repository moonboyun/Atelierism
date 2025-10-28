package kr.co.iei.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.board.model.dao.DesignerBoardDao;
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
		List designerBoardList = designerBoardDao.selectDesignerBoardList(pi);
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("designerBoardList", designerBoardList);
		map.put("pi", pi);
		return map;
	}
}// DesignerBoardService
