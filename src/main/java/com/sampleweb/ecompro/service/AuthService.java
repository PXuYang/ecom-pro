package com.sampleweb.ecompro.service;

import com.sampleweb.ecompro.DTO.RegisterRequest;
import com.sampleweb.ecompro.DTO.RegisterResponse;
import com.sampleweb.ecompro.Exception.RoleNotFoundException;
import com.sampleweb.ecompro.Exception.UsernameAlreadyExistsException;
import com.sampleweb.ecompro.enums.RoleName;
import com.sampleweb.ecompro.model.AppUser;
import com.sampleweb.ecompro.model.Role;
import com.sampleweb.ecompro.repository.AppUserRepo;
import com.sampleweb.ecompro.repository.RoleRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService {

    private final AppUserRepo appUserRepo;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepo;

    public AuthService(AppUserRepo appUserRepo,
                       PasswordEncoder passwordEncoder,
                       RoleRepo roleRepo){

        this.appUserRepo = appUserRepo;
        this.passwordEncoder = passwordEncoder;
        this.roleRepo = roleRepo;
    }

    public RegisterResponse register(RegisterRequest registerRequest){

        if(appUserRepo.existsByUserName(registerRequest.getUserName())) {
            throw new UsernameAlreadyExistsException();
        }

        Role role = roleRepo.findByRoleName(RoleName.CUSTOMER)
                .orElseThrow(() -> new RoleNotFoundException(RoleName.CUSTOMER.name()));

        String encodedPassword = passwordEncoder.encode(registerRequest.getUserPassword());

        AppUser appUser = new AppUser();
        appUser.setUserName(registerRequest.getUserName());
        appUser.setUserPassword(encodedPassword);
        appUser.setRoles(new HashSet<>(Set.of(role)));
        appUserRepo.save(appUser);

        return new RegisterResponse(appUser.getUserName(),
                "Account created successfully!");
    }
}
