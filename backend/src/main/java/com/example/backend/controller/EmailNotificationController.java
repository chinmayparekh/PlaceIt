package com.example.backend.controller;

import com.example.backend.dto.EmailNotificationDTO;
import com.example.backend.service.EmailNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/Email")
public class EmailNotificationController {
    @Autowired
    private EmailNotificationService emailNotificationService;

    @PostMapping("/sendMail")
    public String sendMail(@RequestBody EmailNotificationDTO details)
    {
        String status = emailNotificationService.sendSimpleMail(details);

        return status;
    }
}
