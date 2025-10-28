package kr.co.iei.designer.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="career")
public class CareerDetailDTO {
	private String memberId;
    private String designerCareerSy;
    private String designerCareerEy;
    private String designerCareerCom;
}