package com.example.backend.repository;

import com.example.backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    @Query(value = "SELECT role_id FROM user_role WHERE roll_no = :rollNo", nativeQuery = true)
    ArrayList<Integer> findAllRoles(@Param("rollNo") String rollNo);
}
