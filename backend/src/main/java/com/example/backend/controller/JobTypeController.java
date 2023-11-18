package com.example.backend.controller;

import com.example.backend.dto.JobTypeDTO;
import com.example.backend.service.JobTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jobTypes")
public class JobTypeController {
    private final JobTypeService jobTypeService;

    @Autowired
    public JobTypeController(JobTypeService jobTypeService) { this.jobTypeService = jobTypeService; }

    @PostMapping
    public ResponseEntity<String> createJobType(@RequestBody JobTypeDTO jobTypeDTO) {
        jobTypeService.saveJobType(jobTypeDTO);
        return ResponseEntity.ok("Job Type created successfully");
    }
}
