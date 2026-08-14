package com.speedwheel.backend.controller;

import com.speedwheel.backend.dto.LoginRequest;
import com.speedwheel.backend.entity.User;
import com.speedwheel.backend.security.JwtUtil;
import com.speedwheel.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

     private final JwtUtil jwtUtil;

    private final AuthService authService;

    AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        User user = authService.login(request.getEmail(), request.getPassword());
        return jwtUtil.generateToken(user.getEmail());
    }
}