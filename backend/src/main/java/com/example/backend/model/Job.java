package com.example.backend.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "jobId")
    private int jobId;

    @Column(name = "jobRole")
    private String jobRole;

    
    @Column(name = "companyId")
    private int companyId;

    @Column(name = "appDeadline")
    private Date appDeadline;

    @Column(name = "status")
    private String status;

//    @Column(name = "category")
//    private String category;

//    @Column(name = "salary")
//    private float salary;

    @Column(name = "salaryBreakup")
    private String salaryBreakup;

    @Column(name = "eligibility")
    private String eligibility;

    @Column(name = "addiInfo")
    private String addiInfo;


    @Column(name = "spoc_detail")
    private String spocDetails;

    public Job(Job j) {
        this.jobId = j.getJobId();
        this.jobRole = j.getJobRole();
        this.companyId = j.getCompanyId();
        this.appDeadline = j.getAppDeadline();
        this.status = j.getStatus();
        this.salaryBreakup = j.getSalaryBreakup();
        this.eligibility=j.getEligibility();
        this.addiInfo = j.getAddiInfo();
        this.spocDetails = j.getSpocDetails();
    }
}
