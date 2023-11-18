package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notifId")
    private int notifId;

    @Column(name = "jobId")
    private int jobId;

    @Column(name="sent_user_id")
    private int sentUserId;

    @Column(name = "time")
    private String sentTime;
    
    @Column(name = "subject")
    private String subject;

    @Column(name = "body")
    private String body;

    // @Column(name = "recipients")
    // private User recipients;
}
