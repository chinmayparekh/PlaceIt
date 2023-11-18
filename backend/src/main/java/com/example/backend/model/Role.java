package com.example.backend.model;

import java.util.Set;

import jakarta.persistence.*;
import org.springframework.boot.convert.DataSizeUnit;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private int roleId;

    @Column(name = "role_name")
    private String roleName;
    
    @ManyToMany(mappedBy = "roles",fetch = FetchType.EAGER)
    private Set<User> users;

}
