package com.example.backend.controller;

import com.example.backend.dto.EmailNotificationDTO;
import com.example.backend.dto.JobDTO;
import com.example.backend.model.Hired_Students;
import com.example.backend.model.Job;
import com.example.backend.model.JobDTOReturn;
import com.example.backend.service.EmailNotificationService;
import com.example.backend.service.HiredStudentsService;
import com.example.backend.service.JobService;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/jobs")
public class JobController {
    private final JobService jobService;
    private final HiredStudentsService hiredStudentsService;
    private final EmailNotificationService emailNotificationService;

    @Autowired
    public JobController(JobService jobService, HiredStudentsService hiredStudentsService, EmailNotificationService emailNotificationService) {
        this.jobService = jobService;
        this.hiredStudentsService = hiredStudentsService;
        this.emailNotificationService = emailNotificationService;
    }

    @PostMapping("/add")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    public ResponseEntity<Boolean> addJob(@RequestBody JobDTO jobDTO) throws Exception{
        try
        {

            Boolean addedJob = jobService.addJob(jobDTO.getJob());
            Set<String> emails = hiredStudentsService.getRelevantJobEmails(jobDTO);
            System.out.println("emails: " + emails.size());

            for (String email: emails) {
                String body = "New job has been opened";
                String subject = "New job";
                EmailNotificationDTO emailNotificationDTO = new EmailNotificationDTO();

                emailNotificationDTO.setRecipient(email);
                emailNotificationDTO.setBody(body);
                emailNotificationDTO.setSubject(subject);

                emailNotificationService.sendSimpleMail(emailNotificationDTO);
            }
            return new ResponseEntity<>(addedJob, HttpStatus.CREATED);
        }
        catch(EntityNotFoundException ex)
        {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("find/relevantJobs")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin', 'user')")
    public ResponseEntity<List<Job>> getRelevantJobs(@RequestParam String rollNo) { return new ResponseEntity<>(hiredStudentsService.getRelevantJobs(rollNo), HttpStatus.OK); }


    @GetMapping("find/relevantJobsByEmail")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin', 'user')")
    public ResponseEntity<List<JobDTOReturn>> getRelevantJobsByCollegeEmail(@RequestParam String collegeEmail) { return new ResponseEntity<>(hiredStudentsService.getRelevantJobsByCollegeEmail(collegeEmail), HttpStatus.OK); }

    @GetMapping("find/all")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<List<Job>> findAllJobs()
    {
        return new ResponseEntity<>(jobService.findAll(), HttpStatus.OK);
    }

    @GetMapping("find/company")
    @PreAuthorize("hasAnyRole('admin', 'super-admin')")
    public ResponseEntity<List<Job>> findJobsByCompany(@RequestParam String companyName)
    {
        return new ResponseEntity<List<Job>>(jobService.findByCompanyName(companyName), HttpStatus.OK);
    }

    @PostMapping("/update/{statusFlag}")
    @PreAuthorize("hasAnyRole('admin', 'super-admin')")
    public ResponseEntity<Job> updateJobStatus(@PathVariable int statusFlag, @RequestBody JobDTO jobDTO) throws Exception {
        Job job = jobDTO.getJob();
        return new ResponseEntity<>(jobService.updateJobStatus(job.getJobId(), job, statusFlag), HttpStatus.OK);
    }
}
