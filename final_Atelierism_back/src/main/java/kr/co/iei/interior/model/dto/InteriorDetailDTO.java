package kr.co.iei.interior.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="interiorDetail")
public class InteriorDetailDTO {
	private int paymentNo;
	private int interiorNo;
	private String spaceName;
	private int spaceCount;
	private int spacePrice;
	
}
