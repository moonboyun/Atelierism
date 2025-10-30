package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="reviewBoardMain")
public class ReviewBoardMainDTO {
	private int reviewBoardNo;
	private String reviewBoardTitle;
	private String reviewBoardWriter;
	private String reviewBoardOneline;
	private String reviewBoardContent;
	private String reviewBoardThumbnail;
	private String memberName;
	private String reviewBoardDate;
}
