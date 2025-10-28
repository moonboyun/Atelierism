package kr.co.iei.interior.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.interior.model.dto.InteriorDTO;

@Mapper
public interface InteriorDao {

	int insertInterior(InteriorDTO interior);

	int selectIsInterior(String memberId);

	InteriorDTO selectInterior(String memberId);

	int deleteInterior(int interiorNo);

	List<InteriorDTO> selectPaymentsByMemberId(String memberId);

}
