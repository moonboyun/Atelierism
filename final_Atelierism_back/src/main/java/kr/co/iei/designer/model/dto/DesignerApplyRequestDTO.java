package kr.co.iei.designer.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="designerall")
public class DesignerApplyRequestDTO {
	private DesignerDTO designerInfo; 
    private List<CareerDetailDTO> careerList;
    private List<AwardsCareerDTO> awardList;
}