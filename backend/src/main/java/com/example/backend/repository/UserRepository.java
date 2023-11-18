package com.example.backend.repository;

import com.example.backend.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    
    @Query("SELECT u FROM User u WHERE u.rollNo = ?1")
    User findByRoll(String rollNo);

    @Query("SELECT u from User u WHERE u.collegeEmail = ?1")
    Optional<User> findByCollegeEmail(String collegeEmail);

}
