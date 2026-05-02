package org.library.controller;


import org.library.dto.LoginRequest;
import org.library.dto.RegisterRequest;
import org.library.service.TokenService;
import org.library.service.RegistrationService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
    public String login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password())
        );
        return tokenService.generateToken(authentication);
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest registerRequest) {
        registrationService.register(registerRequest.username(), registerRequest.password());
        return "User registered successfully";
    }

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}




