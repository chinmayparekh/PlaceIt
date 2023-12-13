package com.example.backend.repository;

import com.example.backend.model.Job_Stage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobStageRepository extends JpaRepository<Job_Stage, Integer> {
    
    List<Job_Stage> findByJobIdAndStage(int jobId, Integer stage);
    List<Job_Stage> findByStage(Integer stage);
    List<Job_Stage> findByApplicantRollNumber(String applicantRollNumber);

    List<Job_Stage> findByJobId(Integer jobId);
}
