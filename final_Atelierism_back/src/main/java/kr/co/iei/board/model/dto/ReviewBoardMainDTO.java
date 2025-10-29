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
	private String reviewBoardTitle;
	private String reviewBoardThumbnail;
	private String reviewBoardWriter;
	private String memberName;
	private String reviewBoardDate;
}
