package kr.co.iei.designer.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.designer.model.dto.AwardsCareerDTO;
import kr.co.iei.designer.model.dto.CareerDetailDTO;
import kr.co.iei.designer.model.dto.DesignerChartDTO;
import kr.co.iei.designer.model.dto.DesignerDTO;
import kr.co.iei.designer.model.dto.DesignerDetailDTO;
import kr.co.iei.designer.model.dto.DesignerIntroDTO;
import kr.co.iei.designer.model.dto.DesignerStatusDTO;
import kr.co.iei.designer.model.dto.DesignerStatusDetailDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface DesignerDao {

	List selectAllDesigner();

	int insertDesigner(DesignerDTO designerInfo);
	int insertCareerDetail(CareerDetailDTO career);
    int insertAward(AwardsCareerDTO award);
    
    List<DesignerIntroDTO> selectDesignerList(PageInfo pi);
    int totalCount();
    
    DesignerDetailDTO selectOneDesigner(String memberId);
    List<CareerDetailDTO> selectDesignerCareers(String memberId);
    List<AwardsCareerDTO> selectDesignerAwards(String memberId);

	List selectDesignerBoard();
	
	int statusTotalCount(Map<String, Object> params);
    List<DesignerStatusDTO> selectStatusList(Map<String, Object> params);
    
    DesignerStatusDetailDTO selectStatusDetail(int interiorNo);
    
    int updateStatus(Map<String, Object> params);

	String searchDesignerLink(String designerId);
	
    int updateDesigner(DesignerDTO designerInfo);
    int deleteDesignerCareers(String memberId);
    int deleteDesignerAwards(String memberId);
    
    List<DesignerChartDTO> selectChartData(String designerId);
}
