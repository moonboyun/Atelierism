package kr.co.iei.designer.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.designer.model.dto.AwardsCareerDTO;
import kr.co.iei.designer.model.dto.CareerDetailDTO;
import kr.co.iei.designer.model.dto.DesignerDTO;

@Mapper
public interface DesignerDao {

	List selectAllDesigner();

	int insertDesigner(DesignerDTO designerInfo);
    int insertCareerList(List<CareerDetailDTO> careerList);
    int insertAwardList(List<AwardsCareerDTO> awardList);
//    int updateMemberTypeToDesigner(String memberId);

}
