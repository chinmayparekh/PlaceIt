package com.example.backend.repository;

import com.example.backend.model.Job_Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface JobTypeRepository extends JpaRepository<Job_Type, Integer> {

}
