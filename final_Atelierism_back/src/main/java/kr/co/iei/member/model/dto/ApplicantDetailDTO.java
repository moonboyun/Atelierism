package kr.co.iei.member.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "applicantDetail")
public class ApplicantDetailDTO {
	private String memberId;
	private String memberName;
	private String memberPhone;
	private String memberEmail;
	private String memberAddr;
	private String memberThumb;
	private int designerCareer;
	private String designerGraduationDate;
	private String designerGraduation;
	private String designerBank;
	private String designerAccount;
	private String designerProfolio;
	private String designerChat;
	private String designerAge;
}
