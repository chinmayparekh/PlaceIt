package com.example.backend.repository;

import com.example.backend.model.HR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;



@Repository
public interface HRRepository extends JpaRepository<HR, Integer>{
    List<HR> findByCompany_CompanyName(String companyName);
    HR findByName(String name);
}

