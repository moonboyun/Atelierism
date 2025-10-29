package kr.co.iei.designer.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="designerStatusDetail")
public class DesignerStatusDetailDTO {
    private String interiorWhy;
    private String interiorPaymentDate;
    private int interiorPrice;
    
    private int interiorNo;
    private String interiorMemo;
    private int interiorStatus;

    private String customerName; // 고객의 실제 이름
    
    private int interiorLiving;
    private int interiorKitchen;
    private int interiorBed;
    private int interiorOneroom;
    private int interiorKidroom;
    private int interiorStudy;
    
    //
}
