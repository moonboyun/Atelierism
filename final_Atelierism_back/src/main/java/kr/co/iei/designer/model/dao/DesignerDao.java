package kr.co.iei.designer.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.designer.model.dto.AwardsCareerDTO;
import kr.co.iei.designer.model.dto.CareerDetailDTO;
import kr.co.iei.designer.model.dto.DesignerDTO;
import kr.co.iei.designer.model.dto.DesignerDetailDTO;
import kr.co.iei.designer.model.dto.DesignerIntroDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface DesignerDao {

	List selectAllDesigner();

	int insertDesigner(DesignerDTO designerInfo);
    int insertCareerList(List<CareerDetailDTO> careerList);
    int insertAwardList(List<AwardsCareerDTO> awardList);
//    int updateMemberTypeToDesigner(String memberId);
    
    List<DesignerIntroDTO> selectDesignerList(PageInfo pi);
    int totalCount();
    
    DesignerDetailDTO selectOneDesigner(String memberId);
    List<CareerDetailDTO> selectDesignerCareers(String memberId);
    List<AwardsCareerDTO> selectDesignerAwards(String memberId);

}
