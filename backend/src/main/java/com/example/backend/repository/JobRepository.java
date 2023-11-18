package com.example.backend.repository;

import com.example.backend.model.Job;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {
    List<Job> findAll();

    @Query("SELECT j FROM Job j JOIN Company c ON j.companyId = c.companyId WHERE c.companyName = :companyName")
    List<Job> findJobsByCompanyName(@Param("companyName") String companyName);

    
}

