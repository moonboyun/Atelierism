package kr.co.iei.admin.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "monthList")
public class AdminMonthSalesStatus {
	private int totalOfMonth;
	private int designerMonth;
	private int siteRevenue;
	private int siteSubscriber;
	private String spaceName;
	private int totalOfSpace;
}
