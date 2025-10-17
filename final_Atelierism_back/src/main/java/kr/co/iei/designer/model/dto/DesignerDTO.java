package kr.co.iei.designer.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="designer")
public class DesignerDTO {
	private String memberId;
	private int designerCareer;
	private String designerGraduationData;
	private String designerGraduation;
	private String designerBank;
	private String designerAccunt;
	private String designerProfolio;
	private String designerChat;
	private String designerIntroduce;
}
