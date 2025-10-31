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
import kr.co.iei.designer.model.dto.DesignerChartDTO;
import kr.co.iei.designer.model.dto.DesignerDTO;
import kr.co.iei.designer.model.dto.DesignerDetailDTO;
import kr.co.iei.designer.model.dto.DesignerIntroDTO;
import kr.co.iei.designer.model.dto.DesignerStatusDetailDTO;
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
                designerDao.insertCareerDetail(career); 
            }
        }

    	if (awardList != null && !awardList.isEmpty()) {
            for (AwardsCareerDTO award : awardList) {
                // 각 award 객체에 memberId를 세팅
                award.setMemberId(designerInfo.getMemberId());
                // DAO를 통해 한 줄씩 INSERT
                designerDao.insertAward(award);
            }
        }
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

	public List selectDesignerBoard() {
		List list = designerDao.selectDesignerBoard();
		return list;
	}
	
	public Map selectStatusList(String designerId, int reqPage, String keyword) {
		Map<String, Object> params = new HashMap<>();
        params.put("designerId", designerId);
        params.put("keyword", keyword);

        int numPerPage = 10;   
        int pageNaviSize = 5;
        int totalCount = designerDao.statusTotalCount(params);
        PageInfo pi = pageInfoUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
        params.put("pi", pi);

        List statusList = designerDao.selectStatusList(params);

        HashMap<String, Object> map = new HashMap<>();
        map.put("statusList", statusList);
        map.put("pi", pi);
        return map;
    }
	
	public DesignerStatusDetailDTO selectStatusDetail(int interiorNo) {
        return designerDao.selectStatusDetail(interiorNo);
    }
    
	@Transactional
    public int updateStatus(int interiorNo, String interiorMemo, int interiorStatus) {
        Map<String, Object> params = new HashMap<>();
        params.put("interiorNo", interiorNo);
        params.put("interiorMemo", interiorMemo);
        params.put("interiorStatus", interiorStatus);
        return designerDao.updateStatus(params);
    }

	public String searchDesignerLink(String designerId) {
		String designerLink = designerDao.searchDesignerLink(designerId);
		return designerLink;
	}
	
	@Transactional
    public int updateDesignerInfo(DesignerDTO designerInfo, List<CareerDetailDTO> careerList, List<AwardsCareerDTO> awardList) {
        String memberId = designerInfo.getMemberId();

        int result = designerDao.updateDesigner(designerInfo);
        
        designerDao.deleteDesignerCareers(memberId);
        designerDao.deleteDesignerAwards(memberId);
        
        if (careerList != null && !careerList.isEmpty()) {
            for (CareerDetailDTO career : careerList) {
                career.setMemberId(memberId);
                designerDao.insertCareerDetail(career); 
            }
        }
        
    	if (awardList != null && !awardList.isEmpty()) {
            for (AwardsCareerDTO award : awardList) {
                award.setMemberId(memberId);
                designerDao.insertAward(award);
            }
        }
        return result;
    }
	
	public List<DesignerChartDTO> selectChartData(String designerId) {
        return designerDao.selectChartData(designerId);
    }
}
