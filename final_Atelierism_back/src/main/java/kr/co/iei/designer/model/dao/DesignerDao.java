package kr.co.iei.designer.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DesignerDao {

	List selectAllDesigner();

}
