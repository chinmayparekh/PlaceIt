package com.example.backend.service;

import com.example.backend.dto.RoleDTO;
import com.example.backend.model.Role;
import com.example.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public void saveRole(RoleDTO roleDTO) {
        // Convert RoleDTO to Role entity
        Role role = new Role();
        role.setRoleName(roleDTO.getRoleName());
        
        // Save the entity
        roleRepository.save(role);
    }

    // @Autowired
    // public void getUsers(int user_id)
    // {
        
    // }

}
