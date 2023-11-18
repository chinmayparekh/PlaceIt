package com.example.backend.controller;

import com.example.backend.dto.HiredStudentsDTO;
import com.example.backend.service.HiredStudentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hired")
public class HiredStudentsController {
    private final HiredStudentsService hiredStudentsService;

    @Autowired
    public HiredStudentsController(HiredStudentsService hiredStudentsService) {
        this.hiredStudentsService = hiredStudentsService;
    }

    @PostMapping
    public ResponseEntity<String> newHiredStudentEntry(@RequestBody HiredStudentsDTO hiredStudentsDTO) throws Exception {
        hiredStudentsService.addNewEntry(hiredStudentsDTO);
        return ResponseEntity.ok("Role created successfully");
    }
}
