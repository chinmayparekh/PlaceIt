package com.example.backend.controller;

import com.example.backend.model.Job_Stage;
import com.example.backend.service.JobStageService;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jobstages")
public class JobStageController {
    private final JobStageService jobStageService;

    @Autowired
    public JobStageController(JobStageService jobStageService) {
        this.jobStageService = jobStageService;
    }

    @PostMapping("/add")
    public ResponseEntity<Job_Stage> addJobStage(@RequestBody Job_Stage jobStage) {
        try
        {
            Job_Stage addedJobStage = jobStageService.addJobStage(jobStage);
            return new ResponseEntity<>(addedJobStage, HttpStatus.CREATED);
        }
        catch(EntityNotFoundException ex)
        {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/find/id-stage")
    public ResponseEntity<List<Job_Stage>> getJobStageByJobIdAndStage(@RequestParam int jobId, @RequestParam String stage) {
        List<Job_Stage> list = jobStageService.getJobStageByJobIdAndStage(jobId, stage);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/find/stage")
    public ResponseEntity<List<Job_Stage>> getJobStageByStage(@RequestParam String stage) {
        List<Job_Stage> list = jobStageService.getJobStageByStage(stage);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/find/rollNo")
    public ResponseEntity<List<Job_Stage>> getJobStageByApplicantId(@RequestParam String rollNo) {
        List<Job_Stage> list = jobStageService.getJobStageByApplicantId(rollNo);
        return ResponseEntity.ok(list);
    }

}