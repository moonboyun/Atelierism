package kr.co.iei.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.admin.model.dto.PriceListDto;
import kr.co.iei.admin.model.service.AdminService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	@GetMapping(value = "/list")
	public ResponseEntity<List> selectPriceList() {
		List  pl = adminService.priceListSelect();
		System.out.println(pl);
		return ResponseEntity.ok(pl);
	}
}
