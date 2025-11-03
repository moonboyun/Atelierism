package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="designerBoard")
public class DesignerBoardDTO {
	private int designerReviewNo;
	private int interiorNo;
	private String designerReviewTitle;
	private String designerReviewWriter;
	private String interiorCustomer;
	private int interiorPrice;
	private String categoryCsv;
	private String oneText;
	private String designerReviewContent;
	private String beforeImg;
	private String afterImg;
	private String designerReviewDate;
	private String memberThumb;
}                                                                          

                                              