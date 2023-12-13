package com.example.backend.service;

import com.example.backend.BackendApplication;
import com.example.backend.model.Company;
import com.example.backend.model.HR;
import com.example.backend.repository.CompanyRepository;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {
	private static final Logger logger = LogManager.getLogger(CompanyService.class);
    private static final int List = 0;
    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public Company saveCompany(Company company) {
        logger.info("Company saved");
        return companyRepository.save(company);
    }

    public List<Company> findAll()
    {
        logger.info("Retrieving list of Companies");
        return companyRepository.findAll();
    }

    public Integer getCompanyId(String companyName) {
        logger.info("Retrieving company by name: ", companyName);
        List<Company> allCompanies = findAll();
        for(Company c: allCompanies){
            System.out.println("Company in db:"+c.getCompanyName());
//            System.out.println(c.getCompanyName().equals(companyName));
            if(c.getCompanyName().equals(companyName)){
                return c.getCompanyId();
            }
        }
        logger.error("Company ", companyName, " not found");
        return -1;
    }
}
