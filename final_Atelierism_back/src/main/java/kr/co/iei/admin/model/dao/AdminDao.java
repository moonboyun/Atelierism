package kr.co.iei.admin.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.admin.model.dto.AdminMonthSalesStatus;
import kr.co.iei.admin.model.dto.PriceListDto;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface AdminDao {

	PriceListDto priceListSelect();

	int updatePriceList(PriceListDto priceList);

	List adminMemberList();

	List adminDesignerList();

	List adminApplicantList();

	int memberTotalCount();

	List selectMemberList(Map<String, Object> orderMap);

	List selectApplicantList(Map<String, Object> orderMap);

	int applicantTotalCount(String memOrder);

	List selectApplicantDetail(String memberId);

	List selectApplicantAward(String memberId);

	List selectApplicantCareer(String memberId);

	int refusalDesigner(String memberId);

	int enterDesigner(String memberId);

	int designerTotalCount(String memOrder);

	List selectDesignerList(Map<String, Object> orderMap);

	List applicantList();

	List topDesigner(String toMonth);

	AdminMonthSalesStatus selectMonthList(Map<String, Object> month);

	AdminMonthSalesStatus selectSiteSubscriber(Map<String, Object> month);
	

}
