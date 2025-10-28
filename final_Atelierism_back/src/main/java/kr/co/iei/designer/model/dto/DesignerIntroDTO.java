package kr.co.iei.designer.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("designerIntro")
public class DesignerIntroDTO {

	private String memberId;
    private String memberName;
    private String memberThumb; 

    private String designerIntroduce;
}
