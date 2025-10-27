package kr.co.iei.member.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "applicantAward")
public class ApplicantAwardDTO {
	private String memberId;
	private String designerAwardsDete;
	private String designerAwards;
}
