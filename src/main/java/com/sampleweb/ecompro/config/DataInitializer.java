package com.sampleweb.ecompro.config;

import com.sampleweb.ecompro.enums.RoleName;
import com.sampleweb.ecompro.model.AppUser;
import com.sampleweb.ecompro.model.Role;
import com.sampleweb.ecompro.repository.AppUserRepo;
import com.sampleweb.ecompro.repository.RoleRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepo roleRepo;
    private final AppUserRepo appUserRepo;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepo roleRepo, AppUserRepo appUserRepo, PasswordEncoder passwordEncoder) {
        this.roleRepo = roleRepo;
        this.appUserRepo = appUserRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (roleRepo.findByRoleName(RoleName.ADMIN).isEmpty()){
            Role adminRole = new Role();
            adminRole.setRoleName(RoleName.ADMIN);
            roleRepo.save(adminRole);
        }

        if (roleRepo.findByRoleName(RoleName.CUSTOMER).isEmpty()){
            Role customerRole = new Role();
            customerRole.setRoleName(RoleName.CUSTOMER);
            roleRepo.save(customerRole);
        }

        if (!appUserRepo.existsByUsername("Sean-Admin")){
            Role adminRole = roleRepo.findByRoleName(RoleName.ADMIN).orElseThrow();
            Role customerRole = roleRepo.findByRoleName(RoleName.CUSTOMER).orElseThrow();

            AppUser appUser = new AppUser();
            appUser.setUsername("Sean-Admin");
            appUser.setUserPassword(passwordEncoder.encode("Temp1234!!"));
            appUser.setRoles(Set.of(adminRole, customerRole));

            appUserRepo.save(appUser);
        }
    }
}
