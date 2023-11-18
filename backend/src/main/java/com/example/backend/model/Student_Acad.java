package com.example.backend.model;

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
public class Student_Acad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "studentId")
    private int studentId;

    @Column(name = "course")
    private String course;

    @Column(name = "branch")
    private String branch;

    @Column(name = "specialization")
    private String specialization;

    @Column(name = "cgpa")
    private float cgpa;

    @Column(name = "grad_year")
    private int gradYear;

    @Column(name = "perc_10")
    private float perc10;

    @Column(name = "perc_12")
    private float perc12;
    
	// resume blob unique
}
