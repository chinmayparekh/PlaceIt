package com.example.backend.service;

import com.example.backend.model.Company;
import com.example.backend.model.HR;
import com.example.backend.repository.CompanyRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {
    private static final int List = 0;
    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    public List<Company> findAll()
    {
        return companyRepository.findAll();
    }

    public Integer getCompanyId(String companyName) {
        List<Company> allCompanies = findAll();
        for(Company c: allCompanies){
            System.out.println("Company in db:"+c.getCompanyName());
//            System.out.println(c.getCompanyName().equals(companyName));
            if(c.getCompanyName().equals(companyName)){
                return c.getCompanyId();
            }
        }
        return -1;
    }
}
