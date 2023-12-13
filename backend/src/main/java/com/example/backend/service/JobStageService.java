package com.example.backend.service;

import com.example.backend.dto.Job_StageDTO;
import com.example.backend.model.Job;
import com.example.backend.model.Job_Stage;
import com.example.backend.model.User;
import com.example.backend.repository.JobRepository;
import com.example.backend.repository.JobStageRepository;
import com.example.backend.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobStageService {
    private final JobStageRepository jobStageRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    @Autowired
	private static final Logger logger = LogManager.getLogger(JobStageService.class);

    public JobStageService(JobStageRepository jobStageRepository, JobRepository jobRepository, UserRepository userRepository) {
        this.jobStageRepository = jobStageRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;   
    }


    public Job_Stage addJobStage(Job_Stage jobStage) {

        logger.info("Adding job stage");
        Optional<Job> tempJob = jobRepository.findById(jobStage.getJobId());
        Optional<User> tempUser = userRepository.findById(jobStage.getApplicantRollNumber());

        if (tempJob.isPresent() && tempUser.isPresent())
        {
            return jobStageRepository.save(jobStage);
        }
        else
        {
            logger.error("Job or User not found");
            throw new EntityNotFoundException("Job or User not found");
        }
    }

    public List<Job_Stage> getJobStageByJobIdAndStage(int jobId, Integer stage)
    {
        return jobStageRepository.findByJobIdAndStage(jobId, stage);
    }
    public List<Job_Stage> getJobStageByStage(Integer stage)
    {
        return jobStageRepository.findByStage(stage);
    }
    public List<Job_Stage> getJobStageByApplicantId(String rollNo)
    {
        return jobStageRepository.findByApplicantRollNumber(rollNo);
    }


    public List<Job_StageDTO> getJobStagesByJobId(Integer jobId) {
        logger.info("Finding job stages by jobID: " + jobId);
        List<Job_Stage> jobStages=  jobStageRepository.findByJobId(jobId);
        List<Job_StageDTO> jobStageDTOS = new ArrayList<Job_StageDTO>();
        for(Job_Stage jobStage:jobStages){
            Job_StageDTO jobStageDTO = new Job_StageDTO();
            jobStageDTO.setJobStageID(jobStage.getJobStageID());
            jobStageDTO.setJobId(jobStage.getJobId());
            jobStageDTO.setStage(jobStage.getStage());
            jobStageDTO.setApplicantRollNumber(jobStage.getApplicantRollNumber());
            User user = userRepository.findByRoll(jobStage.getApplicantRollNumber());
            jobStageDTO.setApplicantCollegeEmail(user.getCollegeEmail());
            jobStageDTO.setApplicantName(user.getName());

            jobStageDTOS.add(jobStageDTO);
        }
        return jobStageDTOS;
    }
}
