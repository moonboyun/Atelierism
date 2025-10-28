package kr.co.iei.board.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.util.PageInfo;

@Mapper
public interface DesignerBoardDao {

	int totalCount();

	List selectDesignerBoardList(PageInfo pi);

}// DesignerBoardDao
