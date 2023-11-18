package com.example.backend.dto;

import lombok.Data;

@Data
public class HRRequest {
    private String name;
    private String contact;
    private String email;
    private int companyId; // This field represents the companyId
}
