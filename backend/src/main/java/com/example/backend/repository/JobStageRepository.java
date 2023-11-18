package com.example.backend.repository;

import com.example.backend.model.Job_Stage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobStageRepository extends JpaRepository<Job_Stage, Integer> {
    
    List<Job_Stage> findByJobIdAndStage(int jobId, String stage);
    List<Job_Stage> findByStage(String stage);
    List<Job_Stage> findByApplicantId(String applicantId);
}
