package com.example.backend.service;

import com.example.backend.dto.AuthDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.RoleRepository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {
	private static final Logger logger = LogManager.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;


    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    public UserDetails loadUserByUsername(String collegeEmail) throws UsernameNotFoundException {
        User user = findUserByCollegeEmail(collegeEmail);
//        if(user){
//            throw new UsernameNotFoundException("Invalid username or password.");
//        }
        return new org.springframework.security.core.userdetails.User(user.getCollegeEmail(), user.getAccPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        for(Role r:user.getRoles()){
            authorities.add(new SimpleGrantedAuthority("ROLE_"+r.getRoleName()));
        }
        return authorities;
    }

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Transactional
    public void createUser(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setAccPassword(userDTO.getAccPassword());
        user.setRollNo(userDTO.getRollNo());
        user.setDob(userDTO.getDob());
        user.setPersonalEmail(userDTO.getPersonalEmail());
        user.setAddress(userDTO.getAddress());
        user.setGender(userDTO.getGender());
        user.setContact(userDTO.getContact());
        user.setCollegeEmail(userDTO.getCollegeEmail());

        // Fetch roles from the database based on role IDs in the DTO
        Set<Role> roles = new HashSet<>();
        if (userDTO.getRoles() != null) {
            for (Role role : userDTO.getRoles()) {
               logger.info("ADDING ROLE" + role.getRoleName());
                Optional<Role> fetchedRole = roleRepository.findById(role.getRoleId());
                fetchedRole.ifPresent(roles::add);
//                System.out.println("ADDED ROLE" + fetchedRole);

            }
        }
        user.setRoles(roles);
//        System.out.println("CHECKING USER" + user.getRoles());
        userRepository.save(user);
    }

    @Transactional
    public AuthDTO getUserByRoll(String roll_no)
    {
        User user = userRepository.findByRoll(roll_no);
        AuthDTO authDto = new AuthDTO();
        authDto.setRollNo(user.getRollNo());
        authDto.setAccPassword(user.getAccPassword());
       logger.info("USER FOUND" + user.getRollNo() +" "+ user.getName());
        return authDto;
    }

    @Transactional
    public User modifyUserRoles(String uid, Set<Role> roles) throws  Exception{
        Optional<User> ou = userRepository.findById(uid);
        if(ou.isPresent()){
            User user = ou.get();
            user.setRoles(roles);
            return userRepository.save(user);
        }
        else {
            logger.error("User not found");
            throw new Exception("User not found!");}
    }

    public User findUserByCollegeEmail(String collegeEmail) throws UsernameNotFoundException{
        // FIND USER
        Optional<User> user = userRepository.findByCollegeEmail(collegeEmail);
//        SEND USER ID TO ROLE ROPE
        if(user.isPresent()){
            List<Integer> roleIds = roleRepository.findAllRoles(user.get().getRollNo());
            for(Integer rid : roleIds){
                System.out.println(rid);
            }
            User u = user.get();
            Set<Role> roleSet = new HashSet<Role>();
            for(Integer roleId:roleIds){
                Optional<Role> role = roleRepository.findById(roleId);
                if(role.isPresent()){
                    roleSet.add(role.get());
                }
                else{ 
                    logger.error("Role not found");
                    throw new UsernameNotFoundException("Role not found!");}
            }
            u.setRoles(roleSet);
            return u;
        }
        else{
            logger.error("User not found");
            throw new UsernameNotFoundException("User is not found");
        } 
//        return null;
    }

    public List<User> findAllUsers()
    {
        return userRepository.findAll();
    }
}
