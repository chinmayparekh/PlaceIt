package com.example.backend.service;

import com.example.backend.dto.EmailNotificationDTO;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService {
    private static final Logger logger = LogManager.getLogger(EmailNotificationService.class);

    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}") private String sender;

    public String sendSimpleMail(EmailNotificationDTO details)
    {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getBody());
            mailMessage.setSubject(details.getSubject());

            javaMailSender.send(mailMessage);
            
            logger.info("Mail sent successfully");
            return "Mail Sent Successfully...";
        } catch (Exception e) {
            logger.error("Error sending mail");
            return "Error while Sending Mail";
        }
    }
}
