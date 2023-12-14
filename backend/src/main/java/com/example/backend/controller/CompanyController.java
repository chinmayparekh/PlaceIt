package com.example.backend.controller;

import com.example.backend.model.Company;
import com.example.backend.model.HR;
import com.example.backend.service.CompanyService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/company")
public class CompanyController {
    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping("/add")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<Company> addCompany(@RequestBody Company company) {
        Company savedCompany = companyService.saveCompany(company);
        return new ResponseEntity<>(savedCompany, HttpStatus.CREATED);
    }

    @PostMapping("/addAndGetID")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<Integer> addAndGetCompanyID(@RequestBody Company company) {
        System.out.println("Company Name : " + company);
        Integer cid = companyService.getCompanyId(company.getCompanyName());
        System.out.println(cid);
        if (cid == -1) {
            Company savedCompany = companyService.saveCompany(company);
            cid = companyService.getCompanyId(savedCompany.getCompanyName());
            System.out.println(cid);
            return new ResponseEntity<Integer>(cid, HttpStatus.OK);
        } else {
            System.out.println("Company exists returning company id");
            return new ResponseEntity<Integer>(cid, HttpStatus.OK);
        }
    }

    @GetMapping("/find/all")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<List<Company>> findAllCompanies() {
        return new ResponseEntity<List<Company>>(companyService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/getCompanyId")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<Integer> getCompanyId(@RequestBody String companyName) {
        System.out.println("Company Name : " + companyName);
        Integer cid = companyService.getCompanyId(companyName);
        System.out.println(cid);
        if (cid == -1)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Integer>(cid, HttpStatus.OK);
    }
}
