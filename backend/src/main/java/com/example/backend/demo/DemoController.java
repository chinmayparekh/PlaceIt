package com.example.backend.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/auth/demo-controller")
public class DemoController {
    @GetMapping("/admin-ping")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<String> adminHello() {
        return ResponseEntity.ok("Hello for admin from endpoint");
    }

    @GetMapping("/user-ping")
    @PreAuthorize("hasAuthority('user')")
    public ResponseEntity<String> userHello() {
        return ResponseEntity.ok("Hello for user from endpoint");
    }

    @GetMapping("/super-admin-ping")
    @PreAuthorize("hasRole('super-admin')")
    public ResponseEntity<String> superAdminHello() {
        return ResponseEntity.ok("Hello for super-admin from endpoint");
    }
}
