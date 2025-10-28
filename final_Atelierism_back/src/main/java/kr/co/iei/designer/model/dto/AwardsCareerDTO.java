package kr.co.iei.designer.model.dto;
import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="awards")
public class AwardsCareerDTO {
	private String memberId;
    private String designerAwardsDete;
    private String designerAwards;
}