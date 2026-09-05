package com.sampleweb.ecompro.controller;

import com.sampleweb.ecompro.dto.*;
import com.sampleweb.ecompro.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest registerRequest){

        RegisterResponse registerResponse = authService.register(registerRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(registerResponse);

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest loginRequest){

        LoginResponse loginResponse = authService.login(loginRequest);

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/password-change")
    public ResponseEntity<?> changePassword(
            @Valid @RequestBody PasswordChangeRequest passwordChangeRequest,
            Authentication authentication){

        String username = authentication.getName();

        authService.changePassword(username, passwordChangeRequest);

        return ResponseEntity.ok("Password changed successfully");
    }
}
