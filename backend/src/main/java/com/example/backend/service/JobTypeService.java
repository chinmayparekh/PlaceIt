package com.example.backend.service;

import com.example.backend.dto.JobTypeDTO;
import com.example.backend.model.Job_Type;
import com.example.backend.repository.JobTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobTypeService {

    private final JobTypeRepository jobTypeRepository;

    @Autowired
    public JobTypeService(JobTypeRepository jobTypeRepository) {
        this.jobTypeRepository = jobTypeRepository;
    }

    public void saveJobType(JobTypeDTO jobTypeDTO) {
        Job_Type jt = new Job_Type();
        jt.setJobType(jobTypeDTO.getJobType());

        jobTypeRepository.save(jt);
    }
}
