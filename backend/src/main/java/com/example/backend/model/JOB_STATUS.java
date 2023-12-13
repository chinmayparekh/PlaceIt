package com.example.backend.model;

public enum JOB_STATUS {
    APPLIED("applied"),
    NOT_APPLIED("not applied"),
    OFFERED("offered"),
    REJECTED("rejected");

    private final String jobStatus;

    JOB_STATUS(final String status){
        this.jobStatus = status.toUpperCase();
    }
    @Override
    public String toString() {
        return jobStatus;
    }
}
