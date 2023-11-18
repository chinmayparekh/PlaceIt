package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class Hired_Students {
    @Id
    @Column(name = "rollNo")
    private String rollNo;

    @Column(name = "job_type")
    private int jobTypeId;

    @Column(name = "isPPO")
    private boolean ppo;

    @Column(name = "company")
    private String company;

    @Column(name = "professor")
    private String professor;
}
