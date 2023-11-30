package com.example.backend.service;

import com.example.backend.model.Job;
import com.example.backend.model.Job_Stage;
import com.example.backend.model.User;
import com.example.backend.repository.JobRepository;
import com.example.backend.repository.JobStageRepository;
import com.example.backend.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobStageService {
    private final JobStageRepository jobStageRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    @Autowired
    public JobStageService(JobStageRepository jobStageRepository, JobRepository jobRepository, UserRepository userRepository) {
        this.jobStageRepository = jobStageRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }


    public Job_Stage addJobStage(Job_Stage jobStage) {

        
        Optional<Job> tempJob = jobRepository.findById(jobStage.getJobId());
        Optional<User> tempUser = userRepository.findById(jobStage.getApplicantId());

        if (tempJob.isPresent() && tempUser.isPresent())
        {
            return jobStageRepository.save(jobStage);
        }
        else
        {
            throw new EntityNotFoundException("Job or User not found");
        }
    }

    public List<Job_Stage> getJobStageByJobIdAndStage(int jobId, String stage)
    {
        return jobStageRepository.findByJobIdAndStage(jobId, stage);
    }
    public List<Job_Stage> getJobStageByStage(String stage)
    {
        return jobStageRepository.findByStage(stage);
    }
    public List<Job_Stage> getJobStageByApplicantId(String rollNo)
    {
        return jobStageRepository.findByApplicantId(rollNo);
    }


}