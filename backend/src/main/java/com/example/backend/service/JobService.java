package com.example.backend.service;

import com.example.backend.model.Company;
import com.example.backend.model.Job;
import com.example.backend.repository.CompanyRepository;
import com.example.backend.repository.JobRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobService {
    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;

    @Autowired
    public JobService(JobRepository jobRepository, CompanyRepository companyRepository) {
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
    }

    public Boolean addJob(Job job) {
        Optional<Company> tempCompany = companyRepository.findById(job.getCompanyId());
        String[] eligibility = job.getEligibility().split(",");
        if(tempCompany.isPresent()){
            for(String jobtype: eligibility){
                Job job2BeAdded = new Job(job);
                job2BeAdded.setEligibility(jobtype);
                jobRepository.save(job2BeAdded);
            }
            return true;
        }
        else
        {
            throw new EntityNotFoundException("Company Does Not Exist");
        }
    }

    public List<Job> findAll()
    {
        return jobRepository.findAll();
    }

    public List<Job> findByCompanyName(String companyName)
    {
        return jobRepository.findJobsByCompanyName(companyName);
    }

    public Job updateJobStatus(int jobId, Job newJob, int statusFlag) {
        Optional<Job> existingJob = jobRepository.findById(jobId);

        if (existingJob.isPresent()) {
            Job jobToUpdate = existingJob.get();

            if (statusFlag == 0)//Update everything
            {
                jobToUpdate.setJobRole(newJob.getJobRole());
                jobToUpdate.setAppDeadline(newJob.getAppDeadline());
                jobToUpdate.setStatus(newJob.getStatus());
//                jobToUpdate.setCategory(newJob.getCategory());
//                jobToUpdate.setSalary(newJob.getSalary());
                jobToUpdate.setSalaryBreakup(newJob.getSalaryBreakup());
                jobToUpdate.setEligibility(newJob.getEligibility());
                jobToUpdate.setAddiInfo(newJob.getAddiInfo());
            }
            // Update the status field
            jobToUpdate.setStatus(newJob.getStatus());


            // Save the updated job to the database
            return jobRepository.save(jobToUpdate);
        } else {
            // Handle the case where the job with the given jobId is not found
            throw new EntityNotFoundException("Job with ID " + jobId + " not found");
        }
    }
}
