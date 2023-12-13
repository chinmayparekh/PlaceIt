package com.example.backend.dto;

import java.sql.Date;
import java.text.DateFormat;

import com.example.backend.model.JOB_STATUS;
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
        JOB_STATUS jobStatus = JOB_STATUS.NOT_APPLIED;
        if(status.equals("not applied"))jobStatus=JOB_STATUS.NOT_APPLIED;
        else if(status.equals("applied"))jobStatus=JOB_STATUS.APPLIED;
        else if(status.equals("offered"))jobStatus = JOB_STATUS.OFFERED;
        else jobStatus = JOB_STATUS.REJECTED;

        Job job = new Job(jobId,jobRole,companyId,date,jobStatus,salaryBreakup,eligibility,addiInfo,spocDetails);

        return job;
    }

    public static Date convertStringToSqlDate(String dateString) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = dateFormat.parse(dateString);
        return new Date(utilDate.getTime());
    }
}
