package com.sampleweb.ecompro.service;

import com.sampleweb.ecompro.dto.*;
import com.sampleweb.ecompro.Exception.RoleNotFoundException;
import com.sampleweb.ecompro.Exception.UsernameAlreadyExistsException;
import com.sampleweb.ecompro.security.AppUserDetails;
import com.sampleweb.ecompro.enums.RoleName;
import com.sampleweb.ecompro.model.AppUser;
import com.sampleweb.ecompro.model.Role;
import com.sampleweb.ecompro.repository.AppUserRepo;
import com.sampleweb.ecompro.repository.RoleRepo;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final AppUserRepo appUserRepo;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepo;
    private final AuthenticationManager authenticationManager;

    public AuthService(AppUserRepo appUserRepo,
                       PasswordEncoder passwordEncoder,
                       RoleRepo roleRepo,
                       AuthenticationManager authenticationManager){

        this.appUserRepo = appUserRepo;
        this.passwordEncoder = passwordEncoder;
        this.roleRepo = roleRepo;
        this.authenticationManager = authenticationManager;
    }

    public RegisterResponse register(RegisterRequest registerRequest){

        if(appUserRepo.existsByUsername(registerRequest.getUsername())) {
            throw new UsernameAlreadyExistsException();
        }

        Role role = roleRepo.findByRoleName(RoleName.CUSTOMER)
                .orElseThrow(() -> new RoleNotFoundException(RoleName.CUSTOMER.name()));

        String encodedPassword = passwordEncoder.encode(registerRequest.getUserPassword());

        AppUser appUser = new AppUser();
        appUser.setUsername(registerRequest.getUsername());
        appUser.setUserPassword(encodedPassword);
        appUser.setRoles(new HashSet<>(Set.of(role)));
        appUserRepo.save(appUser);

        return new RegisterResponse(appUser.getUsername(),
                "Account created successfully!");
    }

    public LoginResponse login(LoginRequest loginRequest){

        Authentication authenticationRequest = new UsernamePasswordAuthenticationToken
                (loginRequest.getUsername(), loginRequest.getUserPassword());

        Authentication authentication = authenticationManager.authenticate(authenticationRequest);

        AppUserDetails appUserDetails = (AppUserDetails) authentication.getPrincipal();
        String username = appUserDetails.getUsername();
        Set<RoleName> roles = authentication.getAuthorities()
                .stream()
                .map(authorities -> RoleName.valueOf(authorities.getAuthority()))
                .collect(Collectors.toSet());

        return new LoginResponse(username, roles, "ssss");
    }
}
