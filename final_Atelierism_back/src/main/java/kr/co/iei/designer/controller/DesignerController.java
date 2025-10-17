package kr.co.iei.designer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.designer.model.service.DesignerService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/designer")
public class DesignerController {
	
	@Autowired
	private DesignerService designerService;
	
	@GetMapping
	public ResponseEntity<List> selectDesignerList(){
		List list = designerService.selectAllDesigner();
		return ResponseEntity.ok(list);
	}
}
