package com.example.backend.dto;

import java.sql.Date;
import java.text.DateFormat;

import com.example.backend.model.Job;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.ParseException;
import java.text.SimpleDateFormat;




@Data
@AllArgsConstructor
@NoArgsConstructor
//@Entity
//@Table
public class JobDTO {
    private int jobId;

    private String jobRole;

    private int companyId;

    private String appDeadline;

    private String status;

    private String salaryBreakup;
    private String eligibility;
    private String addiInfo;
    private String spocDetails;

    public Job getJob() throws Exception{
        Date date = convertStringToSqlDate(appDeadline);
        Job job = new Job(jobId,jobRole,companyId,date,status,salaryBreakup,eligibility,addiInfo,spocDetails);
        return job;
    }

    public static Date convertStringToSqlDate(String dateString) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = dateFormat.parse(dateString);
        return new Date(utilDate.getTime());
    }
}
