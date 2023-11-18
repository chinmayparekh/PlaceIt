package com.example.backend.service;

import com.example.backend.model.HR;
import com.example.backend.repository.HRRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HRService {
    private final HRRepository hrRepository;

    @Autowired
    public HRService(HRRepository hrRepository) {
        this.hrRepository = hrRepository;
    }

    public HR saveHR(HR hr) {
        return hrRepository.save(hr);
    }

    public List<HR> saveHRs(List<HR> hrList){
        return hrRepository.saveAll(hrList);
    }

    public HR getHRDetails(String name)
    {
        return hrRepository.findByName(name);
    }

    public List<HR> getHrsByCompany(String companyName)
    {
        System.out.println(hrRepository.findByCompany_CompanyName(companyName));
        return hrRepository.findByCompany_CompanyName(companyName);
    }
}
