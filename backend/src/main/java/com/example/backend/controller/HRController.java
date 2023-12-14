package com.example.backend.controller;

import com.example.backend.dto.HRRequest;
import com.example.backend.model.Company;
import com.example.backend.model.HR;
import com.example.backend.repository.CompanyRepository;
import com.example.backend.service.HRService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/hr")
public class HRController {
    private final HRService hrService;
    private final CompanyRepository companyRepository; // Inject CompanyRepository

    @Autowired
    public HRController(HRService hrService, CompanyRepository companyRepository) {
        this.hrService = hrService;
        this.companyRepository = companyRepository; // Initialize CompanyRepository
    }

    @PostMapping("/add")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<HR> addHRToCompany(@RequestBody HRRequest hrRequest) {
        // Fetch the existing company by its companyId
        int companyId = hrRequest.getCompanyId();
        Optional<Company> optionalCompany = companyRepository.findById(companyId);

        if (optionalCompany.isPresent()) {
            Company existingCompany = optionalCompany.get();

            // Create a new HR
            HR newHR = new HR();
            newHR.setName(hrRequest.getName());
            newHR.setContact(hrRequest.getContact());
            newHR.setEmail(hrRequest.getEmail());

            // Associate the HR with the existing company
            newHR.setCompany(existingCompany);
            
            // Save the HR and update the company in the database
            HR savedHR = hrService.saveHR(newHR);
            return new ResponseEntity<>(savedHR, HttpStatus.CREATED);
        } else {
            System.out.println("COMPANY NOT PRESENT");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public Boolean checkHrExists(HR hr,List<HR> existingList){
        if(existingList.contains(hr))return true;
        return false;
    }
    @PostMapping("/addHRsOfSameCompany")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<List<HR>> addHRsOfSameCompany(@RequestBody List<HRRequest> hrRequests) {
        // Fetch the existing company by its companyId
        System.out.println(hrRequests);
        int companyId = hrRequests.get(0).getCompanyId();
        Optional<Company> optionalCompany = companyRepository.findById(companyId);

        if (optionalCompany.isPresent()) {
            Company existingCompany = optionalCompany.get();

            List<HR> savedHRs= hrService.getHrsByCompany(existingCompany.getCompanyName());
            System.out.println("Existing hr:"+savedHRs.size());
            for(HRRequest hrRequest:hrRequests){
                // Create a new HR
                HR newHR = new HR(hrRequest.getName(),hrRequest.getContact(),hrRequest.getEmail(),existingCompany);
//                newHR.setName(hrRequest.getName());
//                newHR.setContact(hrRequest.getContact());
//                newHR.setEmail(hrRequest.getEmail());
                // Associate the HR with the existing company
//                newHR.setCompany(existingCompany);

                // Check if the hr exists
                if(!checkHrExists(newHR,savedHRs)){
                    // Add the HR to the list of saved HRs if doesn't exist
                    System.out.println("Adding the new hr:" +newHR.getName()+newHR.getContact());
                    savedHRs.add(newHR);
                }

            }
            // Save the list of HRs and update the company in the database
            List<HR> savedHRList = hrService.saveHRs(savedHRs);
            return new ResponseEntity<>(savedHRList, HttpStatus.CREATED);
        } else {
            System.out.println("COMPANY NOT PRESENT");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/find/company")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<List<HR>> getHrsByCompany(@RequestParam String companyName)
    {
        return new ResponseEntity<>(hrService.getHrsByCompany(companyName), HttpStatus.OK);
    }

    @GetMapping("find/name")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public ResponseEntity<HR> getHRDetails(@RequestParam String name)
    {
        return new ResponseEntity<HR>(hrService.getHRDetails(name), HttpStatus.OK);
    }

    @DeleteMapping("/{hrId}")
    @PreAuthorize("hasAnyAuthority('admin', 'super-admin')")
    public void deleteHRById(@PathVariable int hrId) {
        hrService.removeHRById(hrId);
    }
}
