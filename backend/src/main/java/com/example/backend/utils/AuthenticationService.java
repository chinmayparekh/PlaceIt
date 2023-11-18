package com.example.backend.utils;

import com.example.backend.config.JwtService;
import com.example.backend.dto.AuthenticationRequest;
import com.example.backend.dto.AuthenticationResponse;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterRequest request) {
        System.out.println(request.getName());
        for(Role r:request.getRoles()) {
            System.out.println(r.getRoleName());
        }
        byte[] decodedBytes = Base64.getDecoder().decode(request.getAccPassword());
        String decodedPassword = new String(decodedBytes);
        System.out.println(decodedPassword);
        var user = User.builder()
        .name(request.getName())
        .dob(request.getDob())
        .address(request.getAddress())
        .roles(request.getRoles())
        .gender(request.getGender())
        .contact(request.getContact())
        .rollNo(request.getRollNo())
        .personalEmail(request.getPersonalEmail())
        .collegeEmail(request.getCollegeEmail())
        .accPassword(passwordEncoder.encode(request.getAccPassword())).contact(request.getContact()).build();
        for(Role r:user.getRoles()) {
            System.out.println(r.getRoleName());
        }
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws Exception {
        byte[] decodedBytes = Base64.getDecoder().decode(request.getAccPassword());
        String decodedPassword = new String(decodedBytes);
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getCollegeEmail(), request.getAccPassword()));
        User user = userService.findUserByCollegeEmail(request.getCollegeEmail());
        HashMap<String, Object> claims = new HashMap<String, Object>();
        List<String> roles = new ArrayList<String>();

        for (Role role: user.getRoles()) {
            roles.add("ROLE_" + role.getRoleName());
        }
        claims.put("roles", roles.toArray());
        var jwtToken = jwtService.generateToken(claims, user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
