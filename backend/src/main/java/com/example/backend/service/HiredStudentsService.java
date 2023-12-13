package com.example.backend.service;

import com.example.backend.dto.HiredStudentsDTO;
import com.example.backend.dto.JobDTO;
import com.example.backend.model.*;
import com.example.backend.repository.CompanyRepository;
import com.example.backend.repository.HiredStudentsRepository;
import com.example.backend.repository.JobRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.*;

@Service
public class HiredStudentsService {
    private final HiredStudentsRepository hiredStudentsRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;

    @Autowired
    public HiredStudentsService(HiredStudentsRepository hiredStudentsRepository, UserRepository userRepository, JobRepository jobRepository,
                                CompanyRepository companyRepository) {
        this.hiredStudentsRepository = hiredStudentsRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
    }

    @Transactional
    public void addNewEntry(HiredStudentsDTO hiredStudentsDTO) throws Exception {
        Hired_Students student = new Hired_Students();

        student.setRollNo(hiredStudentsDTO.getRollNo());
        student.setJobTypeId(hiredStudentsDTO.getJobTypeId());
        student.setCompany(hiredStudentsDTO.getCompany());
        student.setProfessor(hiredStudentsDTO.getProfessor());
        student.setPpo(hiredStudentsDTO.isPpo());

        User user = userRepository.findByRoll(student.getRollNo());

        if (user != null) hiredStudentsRepository.save(student);
        else throw new Exception("User not found!");
    }

    public List<Job> getRelevantJobs(String rollNo) {
        List<Integer> student_job_type = hiredStudentsRepository.findJobTypeByRollNo(rollNo);
        Set<String> student_jobs = new HashSet<String>();
        List<Job> allJobs = jobRepository.findAll();
        List<Job> relevant_jobs = new ArrayList<Job>();

        for (int job_type: student_job_type) {
            if (job_type == 1) student_jobs.add("6 Month Intern");
            else if (job_type == 2) student_jobs.add("11 Month Intern");
            else if (job_type == 3) student_jobs.add("Fulltime");
            else if (job_type == 4) student_jobs.add("6 Month Intern and Fulltime");
            else if (job_type == 5) student_jobs.add("11 Month Intern and Fulltime");
            else if (job_type == 6 || job_type == 7) student_jobs.add("Summer Intern");
        }

        System.out.println("all jobs :"+allJobs.size());
        for (Job j: allJobs) {
            String[] job_types = j.getEligibility().split(",");
            System.out.println("For job type :"+job_types.toString());
            for (String job_type: job_types) {
                String[] job_separation = job_type.split(" and ");

                if (job_separation.length == 2) {
                    if (student_jobs.contains(job_separation[0]) || student_jobs.contains(job_separation[1])) continue;
                }

                if (!student_jobs.contains(job_type)){// substring check needed
                    Job job2beAdded = new Job(j);
                    job2beAdded.setEligibility(job_type);
                    relevant_jobs.add(job2beAdded);
                }
            }
        }
        System.out.println("relevant jobs"+relevant_jobs.size());

        return relevant_jobs;
    }

    public List<JobDTOReturn> getRelevantJobsByCollegeEmail(String collegeEmail) {
        Optional<User> userOptional = userRepository.findByCollegeEmail(collegeEmail);
        if(userOptional.isPresent()){
            String rollNo = userOptional.get().getRollNo();
            List<Job> fetchedJobs = getRelevantJobs(rollNo);
            List<JobDTOReturn> returnList = new ArrayList<JobDTOReturn>();
            for(Job j:fetchedJobs){
                JobDTOReturn temp = new JobDTOReturn(j.getJobId(), j.getJobRole(), j.getCompanyId(), "", j.getAppDeadline().toString(), j.getStatus().toString(), j.getSalaryBreakup(), j.getEligibility(), j.getAddiInfo(), j.getSpocDetails());
                Optional<Company> c = companyRepository.findById(j.getCompanyId());
                if(c.isPresent())
                temp.setCompanyName(c.get().getCompanyName());
                returnList.add(temp);
            }
            return returnList;
        }

        else
            return new ArrayList<JobDTOReturn>();
    }

    public Set<String> getRelevantJobEmails(JobDTO jobDTO) {
        List<Hired_Students> hired_students = hiredStudentsRepository.findAll();
        Set<String> emails = new HashSet<String>();
        String[] eligibility = jobDTO.getEligibility().split(",");
        List<Integer> job_types = new ArrayList<Integer>();
        HashMap<String, List<Integer>> hiredStudentJobTypes = new HashMap<String, List<Integer>>();

        for (String job_type: eligibility) {
            System.out.println(job_type);
            if (job_type.equals("6 Month Intern")) job_types.add(1);
            else if (job_type.equals("11 Month Intern")) job_types.add(2);
            else if (job_type.equals("Fulltime")) job_types.add(3);
            else if (job_type.equals("6 Month Intern and Fulltime")) job_types.add(4);
            else if (job_type.equals("11 Month Intern and Fulltime")) job_types.add(5);
            else if (job_type.equals("Summer Intern")) job_types.add(6);
        }

        for(Hired_Students hired_student: hired_students) {
            if (!hiredStudentJobTypes.containsKey(hired_student.getRollNo())) {
                hiredStudentJobTypes.put(hired_student.getRollNo(), new ArrayList<Integer>());
            }
            hiredStudentJobTypes.get(hired_student.getRollNo()).add(hired_student.getJobTypeId());
        }

        for (User user: userRepository.findAll()) {
            if (!hiredStudentJobTypes.containsKey(user.getRollNo())) {
                hiredStudentJobTypes.put(user.getRollNo(), new ArrayList<Integer>());
            }
        }

        outer: for (String rollNo: hiredStudentJobTypes.keySet()) {
            User user = userRepository.findByRoll(rollNo);

            if (hiredStudentJobTypes.get(rollNo).contains(4) || hiredStudentJobTypes.get(rollNo).contains(5) || (hiredStudentJobTypes.get(rollNo).contains(1) && hiredStudentJobTypes.get(rollNo).contains(3)) || (hiredStudentJobTypes.get(rollNo).contains(2) && hiredStudentJobTypes.get(rollNo).contains(3))) {
                continue;
            }

            for (Integer job_type: job_types) {
                System.out.println(job_type);
                if (!hiredStudentJobTypes.get(rollNo).contains(job_type)) {
                    emails.add(user.getCollegeEmail());

                    continue outer;
                }
            }
        }
        return emails;
    }
}
