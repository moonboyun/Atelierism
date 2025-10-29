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

    private int interiorNo;
    private String interiorMemo;
    private int interiorStatus;

    private String customerName; // 고객의 실제 이름
}
