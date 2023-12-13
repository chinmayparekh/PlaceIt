package com.example.backend.controller;

import com.example.backend.dto.Job_StageDTO;
import com.example.backend.model.Job_Stage;
import com.example.backend.model.User;
import com.example.backend.service.JobStageService;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/jobstages")
public class JobStageController {
    private final JobStageService jobStageService;

    @Autowired
    public JobStageController(JobStageService jobStageService) {
        this.jobStageService = jobStageService;
    }

    @PostMapping("/add")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
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

    @PostMapping("/add/studentsToNewStage")
    @PreAuthorize("hasAnyAuthority('admin','super-admin')")
    public ResponseEntity<Boolean> addStudentsToJobStage(@RequestBody List<String> users,@RequestParam Integer jobId,@RequestParam Integer stage) throws  Exception{
        try {
            for(String userRollNumber:users){
                System.out.println("USER WITH ROLL NUMBER BEING ADDED IS "+ userRollNumber);
                Job_Stage jobStage = new Job_Stage();
                jobStage.setStage(stage);
                jobStage.setJobId(jobId);
                jobStage.setApplicantRollNumber(userRollNumber);
                jobStageService.addJobStage(jobStage);
            }
        }
        catch ( Exception e){
            System.out.println(e);
        }
        return ResponseEntity.ok(true);
    }
    @GetMapping("/getByJobId")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<List<Job_StageDTO>> getJobStagesByJobId(@RequestParam Integer jobId) {
        List<Job_StageDTO> list = jobStageService.getJobStagesByJobId(jobId);
        return ResponseEntity.ok(list);
    }


    @GetMapping("/find/id-stage")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<List<Job_Stage>> getJobStageByJobIdAndStage(@RequestParam int jobId, @RequestParam Integer stage) {
        List<Job_Stage> list = jobStageService.getJobStageByJobIdAndStage(jobId, stage);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/find/stage")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<List<Job_Stage>> getJobStageByStage(@RequestParam Integer stage) {
        List<Job_Stage> list = jobStageService.getJobStageByStage(stage);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/find/rollNo")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin','user')")
    public ResponseEntity<List<Job_Stage>> getJobStageByApplicantId(@RequestParam String rollNo) {
        List<Job_Stage> list = jobStageService.getJobStageByApplicantId(rollNo);
        return ResponseEntity.ok(list);
    }

}