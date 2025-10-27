package kr.co.iei.member.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "applicantCareer")
public class ApplicantCareerDTO {
	private int careerNo;
	private String memberId;
	private String designerCareerSy;    
	private String designerCareerEy;    
	private String designerCareerCom;
}
