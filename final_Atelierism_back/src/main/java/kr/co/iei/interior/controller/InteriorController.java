package kr.co.iei.interior.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.interior.model.service.InteriorService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/interior")
public class InteriorController {
	
	@Autowired
	private InteriorService interiorService;

}
