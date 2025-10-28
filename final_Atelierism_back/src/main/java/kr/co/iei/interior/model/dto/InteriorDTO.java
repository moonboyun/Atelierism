package kr.co.iei.interior.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="interior")
public class InteriorDTO {
	private int interiorNo;
	private String interiorDesigner;
	private String interiorCustomer;
	private int interiorLiving;
	private int interiorKitchen;
	private int interiorBed;
	private int interiorOneroom;
	private int interiorKidroom;
	private int interiorStudy;
	private int interiorRange;
	private String interiorWhy;
	private int interiorPrice;
	private int interiorPaymentCheck;
	private String interiorPaymentDate;
	private String designerChat;
}
