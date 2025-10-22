package kr.co.iei.board.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.board.model.dto.ReviewBoardDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface ReviewBoardDao {

	int getReviewBoardNo();

	int insertBoard(ReviewBoardDTO board);

	int totalCount();

	List selectBoardList(PageInfo pi);

	ReviewBoardDTO selectOneBoard(int reviewBoardNo);

	int deleteBoard(int reviewBoardNo);

}// ReviewBoardDao
