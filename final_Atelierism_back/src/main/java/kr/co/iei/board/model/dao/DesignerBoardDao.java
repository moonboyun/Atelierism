package kr.co.iei.board.model.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import kr.co.iei.board.model.dto.DesignerBoardDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface DesignerBoardDao {
    int totalCount();
    List<DesignerBoardDTO> selectDesignerBoardList(PageInfo pi);
	int getDesignerReviewNo();
	int insertBoard(DesignerBoardDTO board);
	DesignerBoardDTO selectOneBoard(int designerReviewNo);
	int deleteBoard(int designerReviewNo);
   
}
