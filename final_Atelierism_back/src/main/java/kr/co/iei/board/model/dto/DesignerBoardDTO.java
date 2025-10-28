package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="designerReview")
public class DesignerBoardDTO {
	private int designerReviewNo;
	private int interiorNo;
	private String designerReviewTitle;
	private String designerReviewWriter;
	private String interiorCustomer;
	private int interiorPaymentCheck;
	private int interiorPrice;
	private String oneText;
	private int interiorKategorie;
	private String designerReviewContent;
	private String beforeImg;
	private String afterImg;
	private String designerThumbnail;
	private String designerReviewDate;
}                                                                          
