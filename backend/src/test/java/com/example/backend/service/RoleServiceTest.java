package com.example.backend.service;

import com.example.backend.dto.RoleDTO;
import com.example.backend.model.Role;
import com.example.backend.repository.RoleRepository;
import com.example.backend.service.RoleService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RoleServiceTest {

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private RoleService roleService;

    @Test
    public void testSaveRole() {
        // Arrange
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setRoleName("admin");

        Role role = new Role();
        role.setRoleName(roleDTO.getRoleName());

        when(roleRepository.save(any(Role.class))).thenReturn(role);

        // Act
        roleService.saveRole(roleDTO);

        // Assert
        verify(roleRepository, times(1)).save(any(Role.class));
    }
}