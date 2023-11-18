package com.example.backend.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "User")
public class User implements UserDetails {
    @Id
    @Column(name = "rollNo")
    private String rollNo;

    @Column(name = "acc_password")
    private String accPassword;


    @Column(name = "DOB")
    private Date dob;

    @Column(name = "personal_email", unique = true)
    private String personalEmail;

    @NotBlank
    @Column(name = "address")
    private String address;

    @NotBlank
    @Column(name = "name")
    private String name;

    @NotBlank
    @Column(name = "gender")
    private String gender;

    @Column(name = "contact", unique = true)
    private String contact;

    @Column(name = "college_email", unique = true)
    private String collegeEmail;

    @ManyToMany(fetch= FetchType.EAGER)
    @JoinTable(
        name = "user_role", // Name of the join table
        joinColumns = @JoinColumn(name = "roll_no"), // Column in the join table referring to User
        inverseJoinColumns = @JoinColumn(name = "role_id")// Column in the join table referring to Role
    )
    private Set<Role> roles = new HashSet<Role>();

    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        System.out.println(this.getRoles().size());
        for (Role role : this.roles) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));
            System.out.println(role.getRoleName());
        }
        return authorities;
    }

    @Override
    public String getUsername() {
        return this.collegeEmail;
    }

    @Override
    public String getPassword() {
        return this.accPassword;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public boolean isEnabled() {
        return true;
    }
}

