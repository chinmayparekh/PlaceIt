package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobDTOReturn {
    private int jobId;

    private String jobRole;

    private int companyId;
    private String companyName;

    private String appDeadline;

    private String status;

    private String salaryBreakup;
    private String eligibility;
    private String addiInfo;
    private String spocDetails;

}
