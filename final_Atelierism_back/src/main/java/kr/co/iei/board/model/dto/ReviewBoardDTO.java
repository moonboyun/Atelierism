package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="review")
public class ReviewBoardDTO {
	private int reviewBoardNo;
	private String reviewBoardTitle;
	private String reviewBoardWriter;
	private String reviewBoardOneline;
	private String reviewBoardContent;
	private String reviewBoardThumbnail;
	private String reviewBoardDate;
}// ReviewBoardDTO
