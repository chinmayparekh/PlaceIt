package com.example.backend.dto;


import lombok.Data;

@Data
public class Job_StageDTO {
    private int jobStageID;

    private int jobId;

    private Integer stage;

    private String applicantRollNumber;

    private String applicantCollegeEmail;

    private String applicantName;
}
