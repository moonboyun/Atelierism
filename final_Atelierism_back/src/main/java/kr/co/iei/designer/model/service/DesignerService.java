package kr.co.iei.designer.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.designer.model.dao.DesignerDao;
import kr.co.iei.designer.model.dto.AwardsCareerDTO;
import kr.co.iei.designer.model.dto.CareerDetailDTO;
import kr.co.iei.designer.model.dto.DesignerApplyRequestDTO;
import kr.co.iei.designer.model.dto.DesignerDTO;

@Service
public class DesignerService {
	@Autowired
	private DesignerDao designerDao;
	
	public List selectAllDesigner() {
		List list = designerDao.selectAllDesigner();
		return list;
	}
	
    @Transactional
    public int applyDesigner(DesignerDTO designerInfo, List<CareerDetailDTO> careerList, List<AwardsCareerDTO> awardList) {
        
        designerDao.insertDesigner(designerInfo);

        if (careerList != null && !careerList.isEmpty()) {
            for (CareerDetailDTO career : careerList) {
                career.setMemberId(designerInfo.getMemberId());
            }
            designerDao.insertCareerList(careerList);
        }

        if (awardList != null && !awardList.isEmpty()) {
            for (AwardsCareerDTO award : awardList) {
                award.setMemberId(designerInfo.getMemberId());
            }
            designerDao.insertAwardList(awardList);
        }
//        designerDao.updateMemberTypeToDesigner(designerInfo.getMemberId());
        return 1;
    }
}
