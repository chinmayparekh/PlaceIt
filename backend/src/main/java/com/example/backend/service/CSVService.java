package com.example.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.utils.CSVHelper;
import com.example.backend.model.Job_Type;
import com.example.backend.repository.JobTypeRepository;

@Service
public class CSVService {
    @Autowired
    JobTypeRepository repository;

    public void save(MultipartFile file) {
        try {
            List<Job_Type> jobs = CSVHelper.csvToJobTypes(file.getInputStream());
            repository.saveAll(jobs);
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

    public List<Job_Type> getAllJobTypes() {
        return repository.findAll();
    }
}
