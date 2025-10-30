 package kr.co.iei.designer.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="designerStatus")
public class DesignerStatusDTO {
    private String interiorCustomer; 
    private String customerName;
    private int interiorLiving;
    private int interiorKitchen;
    private int interiorBed;
    private int interiorOneroom;
    private int interiorKidroom;
    private int interiorStudy;
    private String interiorWhy; 
    private String interiorPaymentDate; 

    private int interiorNo;
    private int interiorStatus; 
}