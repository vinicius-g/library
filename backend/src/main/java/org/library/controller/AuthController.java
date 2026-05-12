package org.library.controller;


import org.library.dto.LoginRequest;
import org.library.dto.RegisterRequest;
import org.library.service.TokenService;
import org.library.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authManager;

    private final TokenService tokenService;

    private final RegistrationService registrationService;

    public AuthController(
            AuthenticationManager authManager,
            TokenService tokenService,
            RegistrationService registrationService
    ) {
        this.authManager = authManager;
        this.tokenService = tokenService;
        this.registrationService = registrationService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password())
        );
        String token = tokenService.generateToken(authentication);
        String role = authentication.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_USER");
        
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", role);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest registerRequest) {
        registrationService.register(registerRequest.username(), registerRequest.password());
        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
