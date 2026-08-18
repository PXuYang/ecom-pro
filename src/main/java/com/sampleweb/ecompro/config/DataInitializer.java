package com.sampleweb.ecompro.config;

import com.sampleweb.ecompro.enums.RoleName;
import com.sampleweb.ecompro.model.Role;
import com.sampleweb.ecompro.repository.RoleRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepo roleRepo;

    public DataInitializer(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        if(roleRepo.findByRoleName(RoleName.ADMIN).isEmpty()){
            Role adminRole = new Role();
            adminRole.setRoleName(RoleName.ADMIN);
            roleRepo.save(adminRole);
        }

        if(roleRepo.findByRoleName(RoleName.CUSTOMER).isEmpty()){
            Role customerRole = new Role();
            customerRole.setRoleName(RoleName.CUSTOMER);
            roleRepo.save(customerRole);
        }
    }
}
