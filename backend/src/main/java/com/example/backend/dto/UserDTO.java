package com.example.backend.dto;

import com.example.backend.model.Role;

import com.example.backend.model.User;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class UserDTO {
    private String name;
    private String accPassword;
    private String rollNo;
    private Date dob;
    private String personalEmail;
    private String address;
    private String gender;
    private String contact;
    private String collegeEmail;
    private Set<Role> roles; // Set of roles associated with the user
    public User getUserFromDto(){
        User user = new User();

        user.setName(name);
        user.setAccPassword(accPassword);
        user.setRollNo(rollNo);
        user.setDob(dob);
        user.setPersonalEmail(personalEmail);
        user.setAddress(address);
        user.setGender(gender);
        user.setContact(contact);
        user.setCollegeEmail(collegeEmail);
        user.setRoles(roles);

        return user;
    }
}
