package kr.co.iei.admin.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "priceList")
public class PriceListDto {
	private int priceLiving;
	private int priceKitchen;
	private int priceBed;
	private int priceOneroom;
	private int priceKidroom;
	private int priceStudy;
	private int priceCharge;
}
