package kr.co.iei.admin.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "designerList")
public class AdminDesignerList {
	private int totalPrice;
	private String memberName;
	private String memberPhone;
}
