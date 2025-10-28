package kr.co.iei.designer.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.designer.model.dao.DesignerDao;
import kr.co.iei.designer.model.dto.AwardsCareerDTO;
import kr.co.iei.designer.model.dto.CareerDetailDTO;
import kr.co.iei.designer.model.dto.DesignerApplyRequestDTO;
import kr.co.iei.designer.model.dto.DesignerDTO;
import kr.co.iei.designer.model.dto.DesignerDetailDTO;
import kr.co.iei.designer.model.dto.DesignerIntroDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageInfoUtils;

@Service
public class DesignerService {
	@Autowired
	private DesignerDao designerDao;
	
	@Autowired
	private PageInfoUtils pageInfoUtil;
	
	public List selectAllDesigner() {
		List list = designerDao.selectAllDesigner();
		return list;
	}
	
	public Map selectAllDesigner(int reqPage) {
        int numPerPage = 6;   // 한 페이지당 게시물 수 
		int pageNaviSize = 5; // 페이지 네비게이션 길이
		int totalCount = designerDao.totalCount();
		PageInfo pi = pageInfoUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		
        List designerList = designerDao.selectDesignerList(pi);
		
        HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("designerList", designerList);
		map.put("pi", pi);
		return map;
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
    
    public DesignerDetailDTO selectOneDesigner(String memberId) {
        DesignerDetailDTO dto = designerDao.selectOneDesigner(memberId);

        if(dto != null) {
            List<CareerDetailDTO> careerList = designerDao.selectDesignerCareers(memberId);
            List<AwardsCareerDTO> awardList = designerDao.selectDesignerAwards(memberId);

            dto.setCareerList(careerList);
            dto.setAwardList(awardList);
        }
        return dto;
    }
    
}
