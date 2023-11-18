package com.example.backend.dto;

import com.example.backend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String name;
    private String collegeEmail;
    private String personalEmail;
    private String accPassword;
    private String gender;
    private String contact;
    private String address;
    private String rollNo;
    private Date dob;
    private Set<Role> roles = new HashSet<Role>();
}
