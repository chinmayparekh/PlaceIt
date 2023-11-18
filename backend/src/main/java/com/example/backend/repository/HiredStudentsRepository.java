package com.example.backend.repository;

import com.example.backend.model.Hired_Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HiredStudentsRepository extends JpaRepository<Hired_Students, String> {
    @Query(value = "SELECT job_type FROM hired_students h WHERE h.roll_no = :rollNo", nativeQuery = true)
    List<Integer> findJobTypeByRollNo(@Param("rollNo") String rollNo);
}
