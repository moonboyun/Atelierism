package kr.co.iei.admin.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.admin.model.dto.PriceListDto;

@Mapper
public interface AdminDao {

	PriceListDto priceListSelect();

	int updatePriceList(PriceListDto priceList);

	List adminMemberList();

	List adminDesignerList();

	List adminApplicantList();

}
