package kr.co.iei.designer.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="designerIntro")
public class DesignerIntroDTO {

	private String memberId;
    private String memberName;
    private String memberThumb; 
    private String designerIntroduce;
}
