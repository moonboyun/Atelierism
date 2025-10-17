package kr.co.iei.designer.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.designer.model.dao.DesignerDao;

@Service
public class DesignerService {
	@Autowired
	private DesignerDao designerDao;

	public List selectAllDesigner() {
		List list = designerDao.selectAllDesigner();
		return list;
	}
}
