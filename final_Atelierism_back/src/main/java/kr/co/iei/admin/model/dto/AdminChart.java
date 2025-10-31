package kr.co.iei.admin.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "chart")
public class AdminChart {
	private String mon;
	private int priceOfMonth;
}
