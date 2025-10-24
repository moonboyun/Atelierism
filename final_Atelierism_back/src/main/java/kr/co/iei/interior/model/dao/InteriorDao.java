package kr.co.iei.interior.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.interior.model.dto.InteriorDTO;

@Mapper
public interface InteriorDao {

	int insertInterior(InteriorDTO interior);

	int selectIsInterior(String memberId);

	InteriorDTO selectInterior(String memberId);

	int deleteInterior(int interiorNo);

}
