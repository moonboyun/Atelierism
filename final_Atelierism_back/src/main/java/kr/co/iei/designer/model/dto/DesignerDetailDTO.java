package kr.co.iei.designer.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="designerDetailDTO")
public class DesignerDetailDTO {
    private String memberId;
    private String memberName;
    private String memberThumb;
    private int designerCareer;
    private int designerAge;
    private String designerGraduationDate;
    private String designerGraduation;
    private String designerPortfolio;
    private String designerChat;
    private String designerIntroduce;
    private String designerBank;
    private String designerAccount;

    private List<CareerDetailDTO> careerList;
    private List<AwardsCareerDTO> awardList;
}

