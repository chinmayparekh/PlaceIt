package com.example.backend.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class HiredStudentsDTO {
    private String rollNo;
    private int jobTypeId;
    private boolean ppo;
    private String company;
    private String professor;
}
