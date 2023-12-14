package com.example.backend.service;

import com.example.backend.model.HR;
import com.example.backend.repository.HRRepository;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HRService {
    private static final Logger logger = LogManager.getLogger(HRService.class);

    private final HRRepository hrRepository;

    @Autowired
    public HRService(HRRepository hrRepository) {
        this.hrRepository = hrRepository;
    }

    public HR saveHR(HR hr) {
        logger.info("HR Saved");
        return hrRepository.save(hr);
    }

    public List<HR> saveHRs(List<HR> hrList){
        logger.info("HR List Retrieved");
        return hrRepository.saveAll(hrList);
    }

    public HR getHRDetails(String name)
    {
        logger.info("HR ", name, " found");
        return hrRepository.findByName(name);
    }

    public List<HR> getHrsByCompany(String companyName)
    {
        logger.info("HRs of ", companyName," found");
        System.out.println(hrRepository.findByCompany_CompanyName(companyName));
        return hrRepository.findByCompany_CompanyName(companyName);
    }

    public void removeHRById(int hrId) {
        hrRepository.deleteById(hrId);
    }
}
