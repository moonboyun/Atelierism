package kr.co.iei.designer.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="designerChart")
public class DesignerChartDTO {
    private String month;       // 월 (예: "2025-10")
    private int totalCount;     // 해당 월의 총 작업 건수
    private int completedCount; // 해당 월의 완료 건수
    private int ongoingCount;   // 해당 월의 진행중 건수
}
